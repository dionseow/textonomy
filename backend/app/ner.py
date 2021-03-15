from flair.data import Corpus, Sentence
from flair.embeddings import TokenEmbeddings, WordEmbeddings, StackedEmbeddings
from flair.models import SequenceTagger

model = SequenceTagger.load("/home/dion/Downloads/work/NER/indon-ner/best-model.pt")


def extract_entities(text):
    sentence = Sentence(text)
    model.predict(sentence)
    return sentence.to_tagged_string()
