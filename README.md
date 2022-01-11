# Reddit clone

- [General info](#general-info)
- [Why I built the project this way](#technologies)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This repository holds the source code for a Reddit clone.

Features so far:

- Authentication: signup, login, logout, and persistence
- Posts: adding and deleting posts
- Comments & replies: Adding and deleting comments & replies
- Votes: upvoting and downvoting posts

## Why I built the project this way

- For state management, I realized that many modern React apps aren't using Redux anymore. Therefore, I used `useState` and `Context` because I wanted to establish my foundation in React's core technologies. Not to mentino, there are many viable alternatives to Redux such as react-query, MobX, Zustand, and Recoil.
- I used `TypeScript` because the industry seems to be gravitating toward it and it has so many benefits. Small bugs become so much easier to catch, especially ones that are masterfully hidden through JavaScript's dynamic typing. Refactoring and reiterating code becomes a breeze with TypeScript's code completion and IntelliSense.
- Even though I'm mainly a **front-end developer**, my aim is to gain a well-rounded perspective on developing web applications. Hence, I made this app full-stack to provide myself with an optimal learning experience. For a front-end developer, there are many insights gained by developing a backend such as learning about HTTP, API design, and authentication.
- Testing is important for ensuring that an application is working as intended for users. It helps detect and protect code from bugs as changes are made to an application. Cypress has been gaining popularity as a leading end-to-end testing framework, so I used the technology in this project. You can see some of the code I wrote using it [here](https://github.com/neilgebhard/reddit-clone/blob/master/frontend/cypress/integration/app.spec.js).

## Technologies

Some frameworks and libraries this project is made with:

Frontend:

- React: 17.0.2
- TypeScript: 4.5.4
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

The live demo is deployed on Heroku: https://neilsreddit.herokuapp.com/. Feel free to make an account, add posts, comments, and replies!

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
