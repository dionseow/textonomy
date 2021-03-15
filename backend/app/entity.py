import pandas as pd
import re
from app import db
from app.models import Entity

def load_all_entities():
    entities = Entity.query.all()
    cleaned_entities = []
    for entity in entities:
        cleaned_entity_name = clean_entity(entity.name)
        cleaned_entities.append([cleaned_entity_name, entity.type, entity.articleId, entity.id])
    ent_df = pd.DataFrame(cleaned_entities, columns=['Name', 'Type', 'ArticleId', 'Id'])
    return ent_df

def clean_entity(entity):
    entity = re.sub(',', '', entity)
    entity = re.sub('\)', '', entity)
    entity = re.sub('\(', '', entity)
    entity = re.sub('-', ' ', entity)
    entity = re.sub('\[', '' , entity)
    entity = re.sub('"', '' , entity)
    entity = re.sub('\]', '' , entity)
    entity = re.sub("'", '' , entity)
    entity = re.sub(':', '', entity)
    entity = re.sub(';', '', entity)
    entity = entity.lower()
    return entity

def get_entity_info(ent_name, ent_df):
    ent_info = {}
    df = ent_df[ent_df['Name'] == ent_name]
    num_articles = len(ent_df['ArticleId'].unique())
    ent_info['Type'] = (" ").join(list(df['Type'].unique()))
    ent_info['ArticlesMentioned'] = df['ArticleId'].shape[0]
    ent_info['PercentArticle'] = df['ArticleId'].shape[0] / num_articles
    ent_info['cooccuring'], most_cooccuring = find_cooccurent_ents(ent_name, ent_df)
    ent_info.update(most_cooccuring)
    return ent_info

def find_cooccurent_ents(ent_name, ent_df):
    df = ent_df[ent_df['Name'] == ent_name]
    articles = df['ArticleId'].unique()
    cooccurent_ents = ent_df[ent_df['ArticleId'].isin(articles)]
    cooccurent_ents = cooccurent_ents.drop_duplicates(subset=['Name', 'ArticleId'])
    cooccurent_ents = cooccurent_ents[cooccurent_ents['Name'] != ent_name]

    grpby_ents = cooccurent_ents.groupby('Name').agg({'Type': 'unique', 'ArticleId': 'count'})
    grpby_ents = grpby_ents.reset_index()
    grpby_ents['Type'] = grpby_ents['Type'].apply(lambda x: (' ').join(list(x)))
    grpby_ents = grpby_ents.sort_values(by='ArticleId', ascending=False)
    top_per = grpby_ents[grpby_ents['Type'].str.contains('PER')].head(1)
    top_per = top_per.iloc[0]['Name'] + f'({top_per.iloc[0]["ArticleId"]})' if not top_per.empty else ''
    top_loc = grpby_ents[grpby_ents['Type'].str.contains('LOC')].head(1)
    top_loc = top_loc.iloc[0]['Name'] + f'({top_loc.iloc[0]["ArticleId"]})' if not top_loc.empty else ''
    top_org = grpby_ents[grpby_ents['Type'].str.contains('ORG')].head(1)
    top_org = top_org.iloc[0]['Name'] + f'({top_org.iloc[0]["ArticleId"]})' if not top_org.empty else ''
    grpby_ents = grpby_ents.rename(columns={'ArticleId': 'Count'})
    grpby_ents = grpby_ents.to_dict(orient='records')
    most_cooccuring = {'PER': top_per, 'ORG': top_org, 'LOC': top_loc}
    return grpby_ents, most_cooccuring
