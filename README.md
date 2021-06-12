# Recallama: Search for an FDA drug and food recall
Every now and then we hear about a food recall from a big name company or commonly used produce, but how are we supposed to find out about things that aren't as commonly consumed? How can we find more information about it? Enter: Recallama.

With Recallama, you will be able to search, save, and share all FDA drug and food recalls.

## Table of Contents
- Technologies used
- How to run Recallama locally
- How to use Recallama

## Technologies used
Python, Flask, SQLAlchemy, PostgreSQL, React Hooks, HTML/CSS, Bootstrap, openFDA API

## How to run Recallama locally
- Clone this repository
- Install the requirements using: ```pip3 install -r requirements.txt ```
- Get an API key from [openFDA authentication](https://open.fda.gov/apis/authentication/)
- Create a secrets.sh file and include your openFDA API key in it like this: ```export OPENFDA_KEY="[your-key-goes-here]"```
- Add secrets.sh to .gitignore
- Load the API key to the shell environment once in the terminal with: ```source secrets.sh```
- Seed the database by typing this into the terminal: ```python3.8 seed_database.py```
- Load the website using: ```python3.8 server.py```
- On the browser, search [localhost:5000/](localhost:5000/)

