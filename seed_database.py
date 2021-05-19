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
    status = food_recall['status']

    db_food_recall = crud.create_food_recall(recall_number, 
                                             product_description, 
                                             code_info, 
                                             recalling_firm, 
                                             reason_for_recall, 
                                             recall_initiation_date, 
                                             status)

    food_recalls_in_db.append(db_food_recall)

for n in range(0, 10):
    fname = f'fname{n}' 
    lname = f'lname{n}'
    email = f'user{n}@test.com'  # Voila! A unique email!
    password = 'test'
    
    test_user = crud.create_user(fname, lname, email, password)

    for _ in range(10):
        random_favorite_food_recall = choice(food_recalls_in_db)
        comment = 'comment'
        # drug = ''
        

        crud.create_favorite_food_recall(comment, test_user, random_favorite_food_recall)
