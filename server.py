"""Server for Recallama app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect)
from model import connect_to_db
import crud
import model

from jinja2 import StrictUndefined

from pprint import pformat
import os
import requests


app = Flask(__name__)
app.secret_key = "kksecretkey"
app.jinja_env.undefined = StrictUndefined


# app routes go here
@app.route('/')
def homepage():
    """View homepage."""
    return render_template('homepage.html')

@app.route('/login')
def login():
    """View login page."""
    
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def register_user():
    """Create a new user."""

    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)
    if user:
        flash('Cannot create an account with that email. Try again.')
    else:
        crud.create_user(email, password)
        flash('Account created! Please log in.')

    return redirect('/')

@app.route('/signup')
def signup():
    """View sign up page."""

    return render_template('signup.html')

@app.route('/search')
def search():
    """View the search page."""
    return render_template('search.html')

@app.route('/search/results')
def search_results():
    """View results from the search."""

    url = 'https://api.fda.gov/food/enforcement.json'
    search = '?search='
    field = 'distribution_pattern:"nationwide"'
    limit = '&limit=1'

    complete_url = url + search + field + limit

    data = requests.get(complete_url).json()

    for result in data.get('results', []):
        print(result)

    return render_template('results.html')


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)

