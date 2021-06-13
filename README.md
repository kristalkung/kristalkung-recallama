# Recallama: Search for an FDA drug and food recall
Every now and then we hear about a food recall from a big name company or commonly used produce, but how are we supposed to find out about things that aren't as commonly consumed? How can we find more information about it? Enter: Recallama.

With Recallama, you will be able to search, save, and share all FDA drug and food recalls.

## Table of Contents

- Technologies used
- How to run Recallama locally
- How to use Recallama
- About the Developer

## Technologies used

Python, Flask, SQLAlchemy, PostgreSQL, Javascript, React Hooks, HTML/CSS, Bootstrap, openFDA API

## How to run Recallama locally

- Clone this repository
- Install the requirements using: ```pip3 install -r requirements.txt```
- Get an API key from [openFDA authentication](https://open.fda.gov/apis/authentication/)
- Create a secrets.sh file and include your openFDA API key in it like this: 
  - ```export OPENFDA_KEY="[your-key-goes-here]"```
- Add secrets.sh to .gitignore
- Load the API key to the shell environment once in the terminal with: ```source secrets.sh```
- Seed the database by typing this into the terminal: ```python3.8 seed_database.py```
- Load the website using: ```python3.8 server.py```
- On the browser, search [localhost:5000/](localhost:5000/)

## How to use Recallama

On the search option on the navigation bar, users may click on Drug Recalls or Food Recalls to take you to the search page. Users can fill in at least one field in the search form to see results. On submission, a fetch is made to retrieve the information requested. On the backend, the server will call the openFDA API and return the results.

![search](https://media.giphy.com/media/fZNVwBaLUDPLRykUhi/giphy.gif)

### Other Features

- Users may sign up for an account and log in

![sign up log in](https://media.giphy.com/media/92Jy08QdUz6OZRX25k/giphy.gif)

- User profiles list out all saved recalls
- Users may save and unsave recalls to their profile

![save](https://media.giphy.com/media/XjY9eHcSpbexGglAmU/giphy.gif)

- Recalls may be shared via HTML email tag

![email](https://media.giphy.com/media/PAEGxIyhzC3a06b6jK/giphy.gif)

## About the Developer

Kristal is a research associate in the alternative meat biotech industry. Her passion for the environment led her to where she is today and she is now working towards her next career move. The challenges for software engineering excite her and she believes transitioning to software engineering will allow her to make an even greater impact on the world.

Follow her journey on:

- [LinkedIn](https://linkedin.com/in/kristal-kung)
- [Github](https://github.com/kristalkung)