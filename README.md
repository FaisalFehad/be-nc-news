# NC-News News API

This is the back-end API for a micro-blogging system, that is build with Express.js

## Background

This API is built as a part of the back-end phase of The Developer Pathway course at [North Coders](https://northcoders.com). You can access the live API from [NC-News-BE](https://nc-news2020.herokuapp.com/api/articles/) and the front end of the application is build with React.js is also on [NC-News-FE](https://github.com/FaisalFehad/FE-NC-news). Live demo is also accessible [via this link](https://github.com/FaisalFehad/FE-NC-news)

## Endpoints:

```
GET /api/topics
GET /api/users/:username

GET /api/articles/:article_id
PATCH /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

GET /api/articles

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

```

## Install Locally

To install the application on your local machine.

```bash
$ git clone https://github.com/FaisalFehad/be-nc-news
$ cd be-nc-news
$ npm install -D
$ npm run start
```

## TDD

This API has been developed using TDD. To run the tests please do the following

```
$ cd be-nc-news
$ npm run test
$ npm run test-utils
```

## Libraries

This app has has been developed using the following external libraries

- Express
- Axios
- cors
- knex
- supertest
- Chai
- Chai-sorted
- Mocha
- PSQL
