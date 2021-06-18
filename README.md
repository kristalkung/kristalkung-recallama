# Recallama: Search for an FDA drug and food recall

Every now and then we hear about a food recall from a big name company or commonly used produce, but how are we supposed to find out about things that aren't as commonly consumed? How can we find more information about it?

Enter: Recallama. With Recallama, users will be able to search, save, and share all FDA drug and food recalls.

## Table of Contents

- Technologies used
- How to run Recallama locally
- Features
- Challenges I faced
- Next Steps
- About the Developer

## Technologies used

Python, Flask, SQLAlchemy, PostgreSQL, Javascript, React, HTML/CSS, Bootstrap, openFDA API

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

## Features

### Search for drug and food recalls

On the search option in the navigation bar, users may click on Drug Recalls or Food Recalls to take you to the search page. Users can fill in at least one field in the search form to see results. On submission, a fetch is made to retrieve the information requested. On the backend, the server will call the openFDA API and return the results. New searches will make another API call on the server and the results component will re-render.

![search](https://media.giphy.com/media/fZNVwBaLUDPLRykUhi/giphy.gif)

### Users may sign up for an account and log in

New uses may create an account using a unique email. If a new user inputs an email that is already used for an existing account, they will be prompted to use a different email. After signing up, the user will be added to the database and redirected to the login page. On the server side, the login inputs will be checked if the input email exists in the database, and if so, the input password is compared to the password associated with the email. After logging in, a session key for user and user name will be added to the server. From that point on, the user will be able to access their profile and save recalls to their profile.

![sign up log in](https://media.giphy.com/media/92Jy08QdUz6OZRX25k/giphy.gif)

### User profiles list out all saved recalls

The openFDA API database contains all existing recalls. A key function of the app is the ability to save recalls to a user's profile such that users will be able to refer back to them at a later time. On the user profile, a user's saved recalls is returned from the database using a fetch. If I unsave a recall, my useEffect updates the state and my component re-renders with the updated list of saved recalls.

![save](https://media.giphy.com/media/XjY9eHcSpbexGglAmU/giphy.gif)

### Recalls may be shared via HTML email tag

What's the point of having knowledge if that knowledge cannot be shared? I included an HTML email tag that includes a message and a link that will allow the email receiver to go directly to the shared recall.

![email](https://media.giphy.com/media/PAEGxIyhzC3a06b6jK/giphy.gif)

## Challenges I faced

After a two-week introduction to Javascript and React, I began this nine-week project in my part time software engineering program at Hackbright Academy. I taught myself React and I faced a lot of hurdles along the way.

My biggest challenge was completing my search page. I wanted to display the results of the initial search as well as the results of any new searches made. I spent a couple weeks learning about how I could use a fetch to get the results of my API call and how I could use state to keep track of any searches that were made.

Another challenge was getting the API call on the server to get the results from my search input. I initially used ``` requests.get(url, params={key: value}) ``` for the API call, but had realized that this returned an error describing the request as an invalid search query. I read up on the openFDA API docs and experimented with different ways of making my API calls such that it satisfied a valid query syntax. I learned a lot about finding out what happens on my server when I’m making an API call, what is returned, and how that information is being passed to the front end.

## Next Steps

- Add OAuth
- Deployment

## About the Developer

Kristal is a software engineer with a background in analytical chemistry in the food-biotech industry. Her passion for the environment led her to where she is today and she is now working towards her next career move. The challenges for software engineering excite her and she believes transitioning to software engineering will allow her to make an even greater impact on the world.

Follow her journey on:

- [LinkedIn](https://linkedin.com/in/kristal-kung)
- [Github](https://github.com/kristalkung)
