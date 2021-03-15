from app import app, db
from app.parser import parse_entities
from app.models import Article, Entity
from app.entity import load_all_entities, clean_entity, get_entity_info
from app.summarize import summarize_text
from app.ner import extract_entities
from flask import request
import fasttext
import json
import requests
import re
from sacremoses import MosesTokenizer
import sentencepiece as spm

id_model = fasttext.load_model(r'/home/dion/Downloads/work/textonomy/backend/app/fasttext_w2v_indon.bin')
ms_model = fasttext.load_model(r'/home/dion/Downloads/work/textonomy/backend/app/fasttext_w2v_ms.bin')
ENT_DF = load_all_entities()

html = re.compile('<.*?>|&lt;.*?&gt;')
mtoken_source = MosesTokenizer(lang='id')
token_source = lambda text: mtoken_source.tokenize(re.sub(html, '', str(text)), return_str=True).strip().lower()

indon_sp = spm.SentencePieceProcessor()
indon_sp.load(r'/home/dion/Downloads/work/textonomy/backend/app/source.model')

eng_sp = spm.SentencePieceProcessor()
eng_sp.load(r'/home/dion/Downloads/work/textonomy/backend/app/target.model')


@app.route('/api/articles', methods=['GET'])
def get_all_articles():
    articles = Article.query.all()
    articles_data = []
    for article in articles:
        article_data = {}
        article_data['title'] = article.title
        article_data['language'] = article.language
        article_data['id'] = article.id
        articles_data.append(article_data)
    return json.dumps(articles_data)


@app.route('/api/entities', methods=['GET'])
def get_all_entities():
    entities_df = ENT_DF[['Name', 'Type', 'Id']]
    entities_data = entities_df.to_dict('records')
    return json.dumps(entities_data)


@app.route('/api/articles/<int:article_id>')
def get_article(article_id):
    article = Article.query.get(article_id)
    title = article.title
    text = article.body
    translated_text = article.translated_body
    entities = article.entities.all()
    summary = article.summary
    language = article.language
    def filter_entities_in_article(article, ent_type):
        return [
                {'name': ent.name, 'id': ent.id}
                for ent in article.entities.filter_by(type=ent_type).all()
                ]
    persons = filter_entities_in_article(article, 'PER')
    locations = filter_entities_in_article(article, 'LOC')
    organizations = filter_entities_in_article(article, 'ORG')
    return json.dumps({"title": title,
                       "language": language,
                        "text": text,
                        "translated_text": translated_text,
                        "summary": summary,
                        "persons": persons,
                        "locations": locations,
                        "organizations": organizations})


@app.route('/api/entities/<int:entity_id>')
def get_entity(entity_id):
    entity_name = Entity.query.filter_by(id=entity_id).first().name
    cleaned_ent = clean_entity(entity_name)
    ent_info = get_entity_info(cleaned_ent, ENT_DF)
    ent_info['Name'] = cleaned_ent
    similar_entities = _search_similar_entities(cleaned_ent)
    ent_info['sim_ents'] = similar_entities
    return ent_info


def _search_similar_entities(word):
    if " " in word:
        word = word.replace(" ", "_")
    sim_words = id_model.get_nearest_neighbors(word, k=10)
    words_to_chk = [i[1] for i in sim_words] + [word]
    search_results = []
    for word in words_to_chk:
        if '_' in word:
            word = word.replace('_', ' ')
        query, _ = Article.search(word)
        related_articles = query.all()
        for article in related_articles:
            search_results.append({"word": word,
                                   "id": article.id,
                                   "title": article.title})
    return search_results

@app.route('/api/file-upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        text = uploaded_file.read().decode('utf-8')
        translated_text = translate_text(text)
        summary = summarize_text(text)
        ent_text = extract_entities(text)
        parsed_text, entities_in_text = parse_entities(ent_text)
        return json.dumps({"language": "ID",
                           "text": parsed_text,
                           "translated_text": translated_text,
                           "summary": summary})
    else:
        return json.dumps({});


def translate_text(text):
    print(text.split("\n"))
    lines = text.split("\n")
    translated_text = []
    for line in lines:
        if line == "":
            continue
        tokenized_text = token_source(line)
        subworded_text = ['<s>'] + indon_sp.encode_as_pieces(tokenized_text) + ['</s>']
        subworded_text = " ".join([token for token in subworded_text])
        data = json.dumps([{"src": subworded_text, "id": 100}])
        res = requests.post('http://127.0.0.1:5001/translator/translate', data=data)
        translated = res.json()[0][0]['tgt'].split(" ")
        translated = eng_sp.decode_pieces(translated)
        translated_text.append(translated)
    return ("\n").join(translated_text)

