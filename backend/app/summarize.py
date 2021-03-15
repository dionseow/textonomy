from transformers import *
from summarizer import Summarizer

custom_config = AutoConfig.from_pretrained('cahya/bert-base-indonesian-1.5G')
custom_config.output_hidden_states = True
custom_tokenizer = AutoTokenizer.from_pretrained('cahya/bert-base-indonesian-1.5G')
custom_model = AutoModel.from_pretrained('cahya/bert-base-indonesian-1.5G',
                                         config=custom_config)

model = Summarizer(custom_model=custom_model, custom_tokenizer=custom_tokenizer)

def summarize_text(text, language="indon"):
    result = model(text)
    return result
