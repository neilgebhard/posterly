# MERN Reddit clone

**_Currently a work in progress_**

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This repository holds the source code for a Reddit clone employing the MERN stack -- MongoDB, Express, React, and Node.

Features so far:

- Authentication: signup, login, logout, and persistence
- Posts: adding and deleting posts
- Comments: adding and deleting comments to posts
- Replies: adding and deleting deplies to comments
- Votes: upvoting and downvoting posts

And that's it so far!

## Technologies

Some frameworks and libraries this project is made with:

Frontend:

- React: 17.0.2
- Tailwind CSS
- react-router-dom: 5.3.0
- formik: 2.2.9
- yup: 0.32.11

Backend:

- MongoDB
- Express: 4.17.1
- mongoose: 6.0.11
- JSON web tokens

Testing:

- Cypress: 8.7.0

Deployment:

- Heroku

Note: I wish I started this project with TypeScript.

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

## Demo

The live demo is deployed on Heroku: https://neilsreddit.herokuapp.com/

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
git push heroku main
heroku open
```
