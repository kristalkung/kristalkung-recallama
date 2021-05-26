"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
import server

os.system('dropdb recalls')
os.system('createdb recalls')

model.connect_to_db(server.app)
model.db.create_all()


# Load food recall data from JSON file
with open('data/food-recalls.json') as food_recalls:
    food_recall_data = json.loads(food_recalls.read())

# Create food recalls, store them in list so we can use them
# to create fake favorites later
food_recalls_in_db = []
for food_recall in food_recall_data['results']:
    recall_number, product_description, code_info = (food_recall['recall_number'],
                                                     food_recall['product_description'],
                                                     food_recall['code_info'])
    recalling_firm, reason_for_recall = (food_recall['recalling_firm'],
                                         food_recall['reason_for_recall'])
    recall_initiation_date = datetime.strptime(food_recall['recall_initiation_date'], '%Y%m%d')
    status, product_quantity = (food_recall['status'],
                                food_recall['product_quantity'])
    distribution_pattern, product_type, classification = (food_recall['distribution_pattern'],
                                                          food_recall['product_type'],
                                                          food_recall['classification'])

    db_food_recall = crud.create_food_recall(recall_number, 
                                             product_description, 
                                             code_info, 
                                             recalling_firm, 
                                             reason_for_recall, 
                                             recall_initiation_date, 
                                             status,
                                             product_quantity,
                                             distribution_pattern,
                                             product_type,
                                             classification)

    food_recalls_in_db.append(db_food_recall)

# Load drug recall data from JSON file
with open('data/drug-recalls.json') as drug_recalls:
    drug_recall_data = json.loads(drug_recalls.read())

# Create drug recalls, store them in list so we can use them
# to create fake favorites later
drug_recalls_in_db = []
for drug_recall in drug_recall_data['results']:
    recall_number, product_description, code_info = (drug_recall['recall_number'],
                                                     drug_recall['product_description'],
                                                     drug_recall['code_info'])
    recalling_firm, reason_for_recall = (drug_recall['recalling_firm'],
                                         drug_recall['reason_for_recall'])
    recall_initiation_date = datetime.strptime(drug_recall['recall_initiation_date'], '%Y%m%d')
    status, product_quantity = (drug_recall['status'],
                                drug_recall['product_quantity'])
    distribution_pattern, product_type, classification = (drug_recall['distribution_pattern'],
                                                          drug_recall['product_type'],
                                                          drug_recall['classification'])

    db_drug_recall = crud.create_drug_recall(recall_number, 
                                             product_description, 
                                             code_info, 
                                             recalling_firm, 
                                             reason_for_recall, 
                                             recall_initiation_date, 
                                             status,
                                             product_quantity,
                                             distribution_pattern,
                                             product_type,
                                             classification)

    drug_recalls_in_db.append(db_drug_recall)

for n in range(0, 10):
    fname = f'fname{n}' 
    lname = f'lname{n}'
    email = f'user{n}@test.com'  # Voila! A unique email!
    password = 'test'
    
    test_user = crud.create_user(fname, lname, email, password)

    for _ in range(5):
        random_favorite_food_recall = choice(food_recalls_in_db)
        food_comment = 'I used to eat this!'
        crud.create_favorite_food_recall(food_comment, test_user, random_favorite_food_recall)

        random_favorite_drug_recall = choice(drug_recalls_in_db)
        drug_comment = 'I know someone who takes this drug'
        crud.create_favorite_drug_recall(drug_comment, test_user, random_favorite_drug_recall)
