## MEAN Questions (and Answers)

Today we'll be getting our first taste of the MEAN stack: Mongoose, Express, Angular, Node. We've done server side Mongo/Express/Node and client side Angular. It's time to put the piece together.

## Server Routes
Our routes live in `./api.js`.

Our application has CRUD routes for Questions:

| Method | Action | Verb |
| :---- | :---- | :---- |
| GET | `/api/questions` | index |
| POST | `/api/questions` | create |
| GET | `/api/questions/:id` | show |
| PUT | `/api/questions/:id` | update |
| DELETE | `/api/questions/:id` | destroy |

And some nested routes for Answers:

| Method | Action | Verb |
| :---- | :---- | :---- |
| POST | `/api/questions/:questionId/answers` | create |
| PUT | `/api/questions/:questionId/answers/:id` | update |
| DELETE | `/api/questions/:questionId/answers/:id` | destroy |

We also have routes for Authentication (but resources aren't protected yet):

| Method | Action | Verb |
| :---- | :---- | :---- |
| POST | `/api/users/login` | sessions#create |
| PUT | `/api/users/logout` | sessions#destory |
| UPDATE | `/api/users/register` | user#create |

Take a moment to explore the following files:

- `server.js`
- `api.js`
- `/controllers/questions_controller.js`


## Setup

Clone this repo.

``` bash
npm install
# installs node modules
# (!) installs bower components in the /public/vendor directory

mongod # run the database server (do this in a seperate tab!)
node seed.js # adds a few questions to the databse

nodemon # run the server
open http://localhost:3000 # launch the application in the browser
```

## Postman Challenge
To explore todays application we're going to user a browser extension called [Postman](https://www.getpostman.com/).

Please install the postman browser extension for chrome: https://www.getpostman.com/

Instructions for using Postman can be found here: https://www.getpostman.com/docs/requests

**Challenge**: Can you verify that ALL of the endpoints are working, using curl and/or Postman? Can you create and modify questions and answers?

#### Sidenote: Using CURL to explore API endpoints

GET `questions#index`:

``` bash
curl http://localhost:3000/api/questions
# or
curl -X GET http://localhost:3000/api/questions
```

POST `questions#create`

``` bash
curl -X POST --data "text=I love curling" http://localhost:3000/api/questions
```

PUT and DELETE follow the same pattern!

### Angular Challenge

Your challenge is to setup views for Questions and Answers.

- `/` should display a list of questions
- `/questions/:id` should display a single question + answers
- `/questions/:id/edit` should allow you to update/delete a question

Stretch Goal: A user can answer questions.

### Authorization Challenge

Take a look at the `requireUser` function in `/controllers/users_controller.js`.

How would you use this "middleware" to protect all the API endpoints from a user who isn't logged in? (You don't need to protect GET requests, but definitely POST/PUT/DELETE!)
