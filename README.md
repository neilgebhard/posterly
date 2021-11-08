## MERN Reddit clone

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This repository holds the source code for a MERN Reddit clone that incorporates authentication, posts, comments, and replies. Deployment is on Heroku.

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

/.env

NODE_ENV=development
JWT_SECRET=<secure JWT secret>
DB_URI=<MongoDB URI>
PORT=3001

frontend/.env

REACT_APP_apiURL=http://localhost:3001

```
$ cd ./mern-reddit
$ npm install
$ npm run dev
```
