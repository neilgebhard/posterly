# MERN Reddit clone

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This repository holds the source code for a Reddit clone employing the MERN stack -- MongoDB, Express, React, and Node. It incorporates authentication, posts, comments, and replies. Deployment is on Heroku.

## Technologies

Some libraries this project is created with:

- Express: 4.17.1
- mongoose: 6.0.11
- React: 17.0.2
- jsonwebtoken: 8.5.1
- react-router-dom: 5.3.0
- formik: 2.2.9
- yup: 0.32.11

## Setup

To run this project locally, install using npm install. You'll need to create a .env file at the root of the project and at the root of /frontend.

`/.env`

NODE_ENV=development
JWT_SECRET=<secure JWT secret>
DB_URI=<MongoDB URI>
PORT=3001

`frontend/.env`

REACT_APP_apiURL=http://localhost:3001

```
$ cd ./mern-reddit
$ npm install
$ npm run dev
```

## Testing

Tests are written in the /frontend/cypress/integration directory.

```
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

````# Import data
npm run data:import

# Destroy data
npm run data:destroy```
````
