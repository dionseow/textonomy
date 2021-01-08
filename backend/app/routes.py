from app import app, db
from app.parser import parse_entities
from app.models import Article, Entity
from app.entity import load_all_entities, clean_entity, get_entity_info
import json


#ENT_DF = load_all_entities()


@app.route('/articles', methods=['GET'])
def get_all_articles():
    articles = Article.query.all()
    grid_data = []
    for article in articles:
        article_data = {}
        article_data['title'] = article.title
        article_data['language'] = article.language
        article_data['id'] = article.id
        grid_data.append(article_data)
    return grid_data


@app.route('/articles/<int:article_id>')
def get_article(article_id):
    article = Article.query.get(article_id)
    title = article.title
    text = article.body
    entities = article.entities.all()
    def filter_entities_in_article(article, ent_type):
        return [
                {'name': ent.name, 'id': ent.id}
                for ent in article.entities.filter_by(type=ent_type).all()
                ]
    persons = filter_entities_in_article(article, 'PER')
    locations = filter_entities_in_article(article, 'LOC')
    organizations = filter_entities_in_article(article, 'ORG')
    return


@app.route('/entities/<int:entity_id>')
def get_entity(entity_id):
    entity_name = Entity.query.filter_by(id=entity_id).first().name
    cleaned_ent = clean_entity(entity_name)
    ent_info = get_entity_info(cleaned_ent, ENT_DF)
    ent_info['Name'] = entity_name
    return ent_info

