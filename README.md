# SBA-318-Express-Server

Skill based assigment creating a express server

## Table of Contents

- [About](#about)
- [Technologies](#technologies)
- [Run Locally](#run-locally)
- [API routes](#API-routes)
- [API examples](#API-examples)
- [Template views](#template-views)

## About

The assigment is one of the task from Software Engineering Bootcamp.

Objectives:

- Create a server application with Node and Express.
- Create a RESTful API using Express.
- Create Express middleware.
- Use Express middleware.
- Use a template engine to render views with Express.
- Interact with a self-made API through HTML forms.

The server is a simple blog app, where client can do CRUD operation with users, posts, comments.<br>
The server is using EJS package to render views to the client.<br>
The server is using custom middleware to handle 404 - not found status, and error middleware for any other cases.<br>
The form validation for creating a user was accomplished using Joi package.

## Technologies

- JavaScript
- HTML
- CSS
- Node.js
- Express.js
- EJS package
- Joi package

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install packages

```bash
  npm install
```

Run with node.js

```bash
  nodemon server
```

or

```bash
  npm run dev
```

In browser

```bash
  http://localhost:3000/
```

or

```bash
  http://localhost:3000/api
```

Note: Above route will show hypermedia - links to use API

## API routes

- **GET** /

  - **GET** /api
  - **GET** /api/users
  - **POST** /api/users
    - **GET** /api/users/:id
    - **PATCH** /api/users/:id
    - **DELETE** /api/users/:id
    - **GET** /api/users/:id/posts || **GET** /api/users/:id/posts?sortBy=<value>
    - **GET** /api/users/:id/posts/create - WARNING : this route will render a view to creating a post
  - **GET** /api/posts
  - **POST** /api/posts
    - **GET** /api/posts/:id || **GET** /api/posts?userId=<value>
    - **PUT** /api/posts/:id
    - **DELETE** /api/posts/:id
  - **GET** /api/comments || **GET** /comments?userId=<value> || **GET** /comments?postId=<value>
  - **POST** /api/comments
    - **GET** /api/comments/:id
    - **PATCH** /api/comments/:id
    - **DELETE** /api/comments/:id

## API examples

**USERS**

1. Get all users

```javascript
GET  api/users;
```

2. Create user

```javascript
POST  api/users;
```

Request body example(note: there is optional img property):

```JSON
  {
    "name": "Neville",
    "username": "Neville123",
    "email": "Neville@example.com"
  }
```

3. Get single user by id

```javascript
GET  api/users/2;
```

4.  Get posts created but specific user sorted by the oldest id(the oldest creation)

```javascript
GET  api/users/2/posts?sortBy=id:desc;
```

or

```javascript
GET  api/posts?userId=2
```

**POST**

1. Create post

```javascript
POST  api/posts
```

Request body example:

```JSON
  {
    "userId": 2,
    "title": "I am up to not good",
    "content": "lorem ipsum lorem ipsum"
  }
```

**COMMENTS**

1. Get comments

```javascript
GET  api/comments
```

2. Get comments for a specific post

```javascript
GET  api/comments?postId=2
```

3. Get comments for created by specific user

```javascript
GET  api/comments?userId=1
```

4. Create a comment

```javascript
POST  api/comments
```

Request body example:

```JSON
  {
    "userId": 2,
    "postId":5,
    "body": "lorem ipsum lorem ipsum"
  }
```
