# Front-end Technical Test for DCycle - Mario Ortiz

## Setup

Create a ReactJS project and complete exercises 1 and 2 within this project. All styles must be created using CSS, SASS, or TailwindCSS. When finished, upload the project to a GitHub repository or compress it (excluding the `node_modules` folder) and send it for review.

For exercises 1 and 2, clone the following repository:

```bash
git clone https://github.com/Dacuna97/test-backend-app.git
Run the following commands in the repository folder:
bashCopynpm install
npm start
The server will run on port 3200.
This is a NodeJS backend with Express that calls a series of external APIs. Your task will be to call this backend on port 3200 using the endpoints described below.
Exercise 1
For this exercise, you'll need the following endpoints:

GET /api/genderize/:name - where name is a string parameter. The API response will be a JSON with the most probable gender for that name.
GET /api/nationalize/:name - where name is a string parameter. The API response will be a JSON with a series of countries and the probability that the name belongs to each country.
GET /api/agify/:name - where name is a string parameter. The API response will be a JSON with the most probable age for that name.

Requirements:

Create a form that asks the user to enter their name
After entering the name, call the 3 APIs to obtain the different information
Create a component that displays:

The most probable gender along with the probability
All probable nationalities (if possible with an icon showing their flag) and their probabilities
The most probable age



Exercise 2
For this exercise, you'll need the following endpoint:

GET /api/covid/historical - The API response will be a JSON with historical information by day (for the United States) of cases, tests, and deaths (outcomes.death).

API Documentation: https://covidtracking.com/data/api/version-2
Requirements:

Create a component (or components) that displays relevant information about COVID-19 in the United States by day. You can create a component for each type of information, components that relate 2 or more metrics, or whatever you consider necessary to represent this information in a way that a user can understand.
```
