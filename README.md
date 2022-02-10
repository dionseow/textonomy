# Overview

Textonomy is a data management platform which trivializes the time required to find correlations from textual data.  
Textonomy is built upon 3 main machine learning components - NER, Summarization and Translation  

# Getting started

1. Generate demo data via the news_scraper notebook
2. Preprocess the scraped data via the translate_and_summarize_articles notebook
3. Start up the backend and frontend via the docker-compose.yml (refer to instructions.txt)
4. Upload the processed data to the backend via the upload_articles_to_db.py script