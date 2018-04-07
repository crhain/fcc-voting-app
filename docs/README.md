fcc-voting-app
===================================================================================

This is application was built for freeCodeCamp's Full Stack developer program. A working version can be found at [https://crh-voting-app.herokuapp.com/](https://crh-voting-app.herokuapp.com/)

## DEVELOPMENT ##

* Place a .env file in the root of the project directory.  (See the example .env for format)
* type `npm run start` to start the development server
* view the app at localhost:8080

### .env Example ###

DATABASE=mongodb://[user]:[password]@[address of database]
SESSION_SECRET=[place value here]
TWITTER_CLIENT_ID=[place value here]
TWITTER_CLIENT_SECRET=[place value here]


## REQUIREMENTS ##


A voting app for free code camp back end certificate

Objective: Build a full stack JavaScript app that is functionally similar to this: https://fcc-voting-arthow4n.herokuapp.com/ and deploy it to Heroku.

Note that for each project, you should create a new GitHub repository and a new Heroku project. If you can't remember how to do this, revisit https://freecodecamp.com/challenges/get-set-for-our-dynamic-web-application-projects.

Here are the specific user stories you should implement for this project:

* User Story: As an authenticated user, I can keep my polls and come back later to access them.

* User Story: As an authenticated user, I can share my polls with my friends.

* User Story: As an authenticated user, I can see the aggregate results of my polls.

* User Story: As an authenticated user, I can delete polls that I decide I don't want anymore.

* User Story: As an authenticated user, I can create a poll with any number of possible items.

* User Story: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.

* User Story: As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)

* User Story: As an authenticated user, if I don't like the options on a poll, I can create a new option.
