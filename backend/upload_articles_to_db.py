from app import db, app
from app.models import Article, Entity
from app.parser import parse_entities
import pandas as pd
import os
import json
import re
import requests

processed_articles = pd.read_csv("processed_translated_articles.csv")
processed_articles['translated_body'] = processed_articles['translated_body'].astype(str)

# upload articles into sqlite
with app.app_context():
    for index, row in processed_articles.iterrows():
        print(index)
        entities = eval(row['entities'])
        article = Article(title=row['title'],
                          language=row['language'],
                          body=row['body'],
                          translated_body=row['translated_body'],
                          summary=row['summarized_body'])
        db.session.add(article)
        db.session.commit()
        for key,ent_lst in entities.items():
            ent_lst = list(set(ent_lst))
            for ent_name in ent_lst:
                ent = Entity(name=ent_name, type=key, origin=article)
                db.session.add(ent)
                db.session.commit()

