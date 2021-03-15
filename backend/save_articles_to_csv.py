from app import db, app
from app.models import Article, Entity
from app.parser import parse_entities
import pandas as pd
import os
import json
import re
import requests

indon_articles = pd.read_csv(os.path.join(os.getcwd(), 'data/predicted_indon_wiki.csv'))
malay_articles = pd.read_csv(os.path.join(os.getcwd(), 'data/predicted_malay_wiki.csv'))
lst = []

with app.app_context():
    for index, row in indon_articles.iterrows():
        parsed_article, parsed_entities = parse_entities(row['article'])
        lst.append({
            'title': row['title'],
            'language': 'ID',
            'body': parsed_article,
            'entities': parsed_entities,
                    })
    for index, row in malay_articles.iterrows():
        parsed_article, parsed_entities = parse_entities(row['article'])
        lst.append({
            'title': row['title'],
            'language': 'MS',
            'body': parsed_article,
            'entities': parsed_entities,
                    })

df = pd.DataFrame(lst)
df.to_csv("articles.csv")

# Run translate_and_summarize_articles.ipynb in google colab



