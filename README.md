# Reddit clone

This repository holds the source code for a Reddit clone. The live demo is deployed on Heroku: https://neilsreddit.herokuapp.com/.

## Features

- **Authentication**: signup, login, logout, and persistence
- **Posts**: adding and deleting posts
- **Comments & replies**: Adding and deleting comments & replies
- **Votes**: upvoting and downvoting posts

## Technologies

Frontend:

- React
- TypeScript
- Tailwind CSS
- react-router-dom
- formik
- yup

Backend:

- MongoDB
- Express
- mongoose
- JSON web tokens

Testing:

- Cypress

Deployment:

- Heroku

## Setup

To run this project locally, install dependencies using npm install. You'll need to create a .env file at the root of the project and at the root of /frontend.

`/.env`

```
NODE_ENV=development
JWT_SECRET=<secure JWT secret>
DB_URI=<MongoDB URI>
PORT=3001
```

`frontend/.env`

```
REACT_APP_apiURL=http://localhost:3001
```

Install dependencies using npm:

```
$ cd ./mern-reddit
$ npm install
$ npm run dev
```

## Testing

Tests are written in app.spec.js in the `/frontend/cypress/integration` directory.

Note: The application must be running in a different terminal in order for Cypress to access it for testing purposes.

```
$ cd /frontend
$ npm run cypress
```

After running the tests, you can can see the coverage report using nyc:

```
# see just the coverage summary
$ npx nyc report --reporter=text-summary

# see just the coverage file by file
$ npx nyc report --reporter=text

# save the HTML report again
$ npx nyc report --reporter=lcov
```

## Seed database

You can use the following commands to seed or clear the database with data found in `/backend/config/db.js`:

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

## Heroku

To log in to Heroku in terminal:

```
heroku login
```

To test app before deploying to Heroku servers:

```
heroku local web
```

To deploy to Heroku:

```
heroku create
git push heroku master
heroku open
```
