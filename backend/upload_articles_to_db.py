from app import db, app
from app.models import Article, Entity
from app.parser import parse_entities
import pandas as pd
import os
import json
import re

indon_articles = pd.read_csv(os.path.join(os.getcwd(), 'data/predicted_indon_wiki.csv'))
malay_articles = pd.read_csv(os.path.join(os.getcwd(), 'data/predicted_malay_wiki.csv'))

# upload articles into sqlite
with app.app_context():
    for index, row in indon_articles.iterrows():
        print(index)
        parsed_article, parsed_entities = parse_entities(row['article'])
        article = Article(title=row['title'],
                          language='ID',
                          body=parsed_article)
        db.session.add(article)
        db.session.commit()
        for key,ent_lst in parsed_entities.items():
            ent_lst = list(set(ent_lst))
            for ent_name in ent_lst:
                ent = Entity(name=ent_name, type=key, origin=article)
                db.session.add(ent)
                db.session.commit()

    for index, row in malay_articles.iterrows():
        print(index)
        parsed_article, parsed_entities = parse_entities(row['article'])
        article = Article(title=row['title'],
                          language='MS',
                          body=parsed_article)
        db.session.add(article)
        db.session.commit()
        for key,ent_lst in parsed_entities.items():
            ent_lst = list(set(ent_lst))
            for ent_name in ent_lst:
                ent = Entity(name=ent_name, type=key, origin=article)
                db.session.add(ent)
                db.session.commit()
