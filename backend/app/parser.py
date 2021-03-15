import re

def _sub_entities(entity_lst):
    entity_dic = {'<B-PER>': "<person class='label'>{}</person>",
                  '<B-LOC>': "<loc class='label'>{}</loc>",
                  '<B-ORG>': "<org class='label'>{}</org>"}
    # not multiple words entity
    if len(entity_lst) == 1:
        curr_format = (' ').join(entity_lst[0][:2])
        new_format = entity_dic[entity_lst[0][1]].format(entity_lst[0][0])
        return [curr_format, new_format]
    else:
        entity_lst = [i[:2] for i in entity_lst]
        entity_lst = [i for j in entity_lst for i in j]
        curr_format = (' ').join(entity_lst)
        new_format = entity_dic[entity_lst[1]].format((' ').join(entity_lst[::2]))
        return [curr_format, new_format]

def _convert_newline_to_para_tag(text):
    """
    Converts every \n to a <p> tag with data-section-id attribute for sidecomments
    """
    counter = 1
    while text.find('\n') != -1:
        text = text.replace('\n', f' </p><p> ', 1)
        counter += 1
    # end last p tag
    text = text + '</p>'
    return text

def _identify_entity_type(sub_text):
    if "<B-PER>" in sub_text:
        return "PER"
    if "<B-ORG>" in sub_text:
        return "ORG"
    if "<B-LOC" in sub_text:
        return "LOC"
    raise

def _identify_entity_name(sub_text):
    return sub_text.split('>')[1].split('<')[0]


def parse_entities(text):
    """
    Convert <B-LOC> etc into <span> for viewing
    """
    text = _convert_newline_to_para_tag(text)
    words = text.split(' ')
    entities = ['<B-LOC>', '<I-LOC>', '<B-PER>', '<I-PER>', '<B-ORG>', '<I-ORG>']
    entities_in_text = []
    for index, word in enumerate(words):
        if word in entities:
            entities_in_text.append([words[index-1], word, index])
    # model sometimes predicts I w/o a B first
    # if I is the first predicted, replace into B first
    if entities_in_text:
        if 'I' in entities_in_text[0][1]:
            entities_in_text[0][1] = entities_in_text[0][1].replace('I', 'B')
    entity_sub_lst = []
    while len(entities_in_text) > 0:
        curr_entity = []
        if "B" in entities_in_text[0][1]:
            curr_entity.append(entities_in_text.pop(0))
            while len(entities_in_text) > 0 and "I" in entities_in_text[0][1]:
                curr_entity.append(entities_in_text.pop(0))
            entity_sub_lst.append(_sub_entities(curr_entity))
    entities_in_text = {}
    for sub in entity_sub_lst:
        # substitute the entities
        sub[0] = sub[0].replace('(', '\(')
        sub[0] = sub[0].replace(')', '\)')
        sub[0] = sub[0].replace('{', '\{')
        sub[0] = sub[0].replace('}', '\}')
        sub[0] = sub[0].replace('[', '\[')
        sub[0] = sub[0].replace(']', '\]')
        sub[0] = sub[0].replace('?', '\?')
        sub[0] = sub[0].replace('*', '\*')
        sub[0] = sub[0].replace('+', '\+')
        try:
            text = re.sub(sub[0], sub[1], text)
        except Exception:
            print(sub[0])
            continue
        # record all entities substituted
        entity_type = _identify_entity_type(sub[0])
        entity_name = _identify_entity_name(sub[1])
        if entity_type in entities_in_text:
            entities_in_text[entity_type].append(entity_name)
        else:
            entities_in_text[entity_type] = [entity_name]
    return text, entities_in_text
