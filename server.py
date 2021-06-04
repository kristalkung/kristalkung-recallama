"""Server for Recallama app."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db
import crud
import model

from jinja2 import StrictUndefined

from pprint import pformat
import os
import requests

app = Flask(__name__)
app.jinja_env.undefined = StrictUndefined
app.secret_key = 'secret key'

API_KEY = os.environ['OPENFDA_KEY']

@app.route('/logout')
@app.route('/profile')
@app.route('/results')
@app.route('/signup')
@app.route('/login')
@app.route('/search/food')
@app.route('/search/drug')
@app.route('/')
def homepage():
    """view homepage"""
    
    return render_template('root.html')

@app.route('/api/login', methods=["POST"])
def login():

    input_email = request.form.get('email')
    input_password = request.form.get('password')

    user = crud.get_user_by_email(input_email)

    if user and user.password == input_password:
        session['user'] = user.user_id
        session['user_name'] = f'{user.fname} {user.lname}'
        return redirect('/profile')
    
    else:
        flash('incorrect login')
        return redirect('/login')

@app.route('/api/logout', methods=["POST"])
def logout():
    """Logs out a user."""

    data = request.get_json()

    log_out_response = data['logout']

    print(f'data is: {data}')
    print(f'log out response is: {log_out_response}')

    if log_out_response == "yes":
        del session['user']
        del session['user_name']

        return '"log out successful"'
    else:
        return '"no log out"'
    
@app.route('/api/signup', methods=["POST"])
def signup():

    data = request.get_json()

    input_fname = data['fname']
    input_lname = data['lname']
    input_email = data['email']
    input_password = data['password']

    if input_email in crud.get_all_emails():
        return '"email used"'
    
    new_user = crud.create_user(input_fname, input_lname, input_email, input_password)

    return '"account made"'

@app.route('/api/food-results', methods=["POST"])
def search_food_results():

    payload = {
        'api_key': API_KEY,
        'limit': "50"
    }

    product_description = request.json.get("description")
    reason_for_recall = request.json.get("reasonForRecall")
    recalling_firm = request.json.get("recallingFirm")    

    search_terms = []
    if product_description:
        search_terms.append(f'product_description:"{product_description}"')
    if reason_for_recall:
        search_terms.append(f'reason_for_recall:"{reason_for_recall}"')
    if recalling_firm:
        search_terms.append(f'recalling_firm:"{recalling_firm}"')

    if search_terms:
        payload['search'] = '+AND+'.join(search_terms)
    
    url = 'https://api.fda.gov/food/enforcement.json'
    complete_url = url + '?api_key=' + payload['api_key'] + '&search=' + payload['search'] + '&limit=' + payload['limit']

    data = requests.get(complete_url).json()

    result = {}

    if data.get('error'):
        result['results'] = None
        result['error'] = data['error']
    else:
        recall_list = data['results']

        for recall in recall_list:
            input_recall_number = recall['recall_number']
            recall_obj = crud.get_food_recall_by_recall_number(input_recall_number)

            obj_id = recall_obj.food_id

            recall['food_id'] = obj_id

        result['results'] = recall_list
        result['error'] = None

    return jsonify(result)

@app.route('/api/food/<food_id>', methods=["POST"])
def view_food_recall_info(food_id):
    """View an individual food recall's information."""

    food_recall = crud.get_food_recall_by_id(food_id)
    food_dict = {}
    
    recall_number = food_recall.recall_number, 
    product_description = food_recall.product_description, 
    code_info = food_recall.code_info, 
    recalling_firm = food_recall.recalling_firm, 
    reason_for_recall = food_recall.reason_for_recall, 
    recall_initiation_date = food_recall.recall_initiation_date, 
    status = food_recall.status

    food_dict['recall_number'] = recall_number[0]
    food_dict['product_description'] = product_description[0]
    food_dict['code_info'] = code_info[0]
    food_dict['recalling_firm'] = recalling_firm[0]
    food_dict['reason_for_recall'] = reason_for_recall[0]
    food_dict['recall_initiation_date'] = recall_initiation_date[0]
    food_dict['status'] = status

    return jsonify(food_dict)

@app.route('/food/<food_id>')
def view_food_recall(food_id):
    """View a single food recall"""

    return render_template('root.html', food_id=food_id)

@app.route('/save-food-to-profile', methods=["POST"])
def save_food_recall_to_profile():

    data = request.get_json()

    food_id = int(data['food_id'])
    comment = data['comment']

    if 'user' in session:
        user = crud.get_user_by_id(session['user'])
        food = crud.get_food_recall_by_id(food_id)
        
        crud.create_favorite_food_recall(comment, user, food)
        return '"favorite added"'
    else:
        return '"please log in"'

@app.route('/api/drug-results', methods=["POST"])
def search_drug_results():

    payload = {
        'api_key': API_KEY,
        'limit': "50"
    }

    product_description = request.json.get("description")
    reason_for_recall = request.json.get("reasonForRecall")
    recalling_firm = request.json.get("recallingFirm")    

    search_terms = []
    if product_description:
        search_terms.append(f'product_description:"{product_description}"')
    if reason_for_recall:
        search_terms.append(f'reason_for_recall:"{reason_for_recall}"')
    if recalling_firm:
        search_terms.append(f'recalling_firm:"{recalling_firm}"')

    if search_terms:
        payload['search'] = '+AND+'.join(search_terms)
    
    url = 'https://api.fda.gov/drug/enforcement.json'
    complete_url = url + '?' + 'api_key=' + payload['api_key'] + '&search=' + payload['search'] + '&limit=' + payload['limit']

    data = requests.get(complete_url).json()

    print(f"***** data {data}")

    result = {}

    if data.get('error'):
        result['results'] = None
        result['error'] = data['error']
    else:
        recall_list = data['results']

        for recall in recall_list:
            input_recall_number = recall['recall_number']
            recall_obj = crud.get_drug_recall_by_recall_number(input_recall_number)

            obj_id = recall_obj.drug_id

            recall['drug_id'] = obj_id

        result['results'] = recall_list
        result['error'] = None

    return jsonify(result)

@app.route('/drugs/<drug_id>')
def view_drug_recall(drug_id):
    """View a single drug recall"""

    return render_template('root.html', drug_id=drug_id)

@app.route('/api/drug/<drug_id>', methods=["POST"])
def view_drug_recall_info(drug_id):
    """View an individual drug recall's information."""

    drug_recall = crud.get_drug_recall_by_id(drug_id)
    drug_dict = {}
    
    recall_number = drug_recall.recall_number, 
    product_description = drug_recall.product_description, 
    code_info = drug_recall.code_info, 
    recalling_firm = drug_recall.recalling_firm, 
    reason_for_recall = drug_recall.reason_for_recall, 
    recall_initiation_date = drug_recall.recall_initiation_date, 
    status = drug_recall.status

    drug_dict['recall_number'] = recall_number[0]
    drug_dict['product_description'] = product_description[0]
    drug_dict['code_info'] = code_info[0]
    drug_dict['recalling_firm'] = recalling_firm[0]
    drug_dict['reason_for_recall'] = reason_for_recall[0]
    drug_dict['recall_initiation_date'] = recall_initiation_date[0]
    drug_dict['status'] = status

    return jsonify(drug_dict)

@app.route('/save-drug-to-profile', methods=["POST"])
def save_drug_recall_to_profile():

    data = request.get_json()

    drug_id = int(data['drug_id'])
    comment = data['comment']

    if 'user' in session:
        user = crud.get_user_by_id(session['user'])
        drug = crud.get_drug_recall_by_id(drug_id)
        
        crud.create_favorite_drug_recall(comment, user, drug)
        return '"favorite added"'
    else:
        return '"please log in"'
    
@app.route('/api/profile/<user_id>', methods=['GET'])
def view_favorites(user_id):
    """View a user's favorites(saved recalls)"""

    obj_list = crud.get_all_favorites_by_user(user_id)
    
    fav_list = []

    for favorite in obj_list:

        fav_dict = {}

        favorite_id = favorite.favorite_id
        user_id = favorite.user_id 
        food_id = favorite.food_id 
        drug_id = favorite.drug_id
        comment = favorite.comment 

        if food_id == None:
            drug = crud.get_drug_recall_by_id(drug_id)

            drug_recalling_firm = drug.recalling_firm
            drug_product_description = drug.product_description
            drug_product_type = drug.product_type

            fav_dict['recalling_firm'] = drug_recalling_firm
            fav_dict['description'] = drug_product_description
            fav_dict['id'] = drug_id
            fav_dict['product_type'] = drug_product_type

        elif drug_id == None:
            food = crud.get_food_recall_by_id(food_id)

            food_recalling_firm = food.recalling_firm
            food_product_description = food.product_description
            food_product_type = food.product_type

            fav_dict['recalling_firm'] = food_recalling_firm
            fav_dict['description'] = food_product_description
            fav_dict['id'] = food_id
            fav_dict['product_type'] = food_product_type

        fav_dict['favorite_id'] = favorite_id
        fav_dict['user'] = user_id
        fav_dict['comment'] = comment
        
        fav_list.append(fav_dict)
    
    return jsonify(fav_list)


@app.route('/api/unsave', methods=['POST'])
def unsave_recall():
    data = request.get_json()

    favorite_id = int(data['favorite_id'])
    
    user = crud.get_user_by_favorite_id(favorite_id)
    
    user_id = user.user_id

    crud.delete_favorite_recall(favorite_id)

    updated_list = view_favorites(user_id)
    
    return updated_list

@app.route('/profile')
def view_profile_for_logged_in_users():
    if 'user' in session:
        user = crud.get_user_by_id(session['user'])

        user_id = user.user_id
        return render_template('root.html', user_id=user_id)


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)