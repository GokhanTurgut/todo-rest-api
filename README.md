# Todo REST API

Open source basic todo api with authentication that can be used by everyone for their personal projects.

https://gokhan-todo-rest-api.herokuapp.com/

## Technologies

- NodeJS
- Express
- TypeScript
- MySQL
- TypeORM
- Joi
- Jsonwebtoken
- Bcrypt
- Cors
- Dotenv

## Documentation

### POST /auth/signup

Request Body:

```
{
  "email": "test@test.com", // Required must be unique and valid
  "firstName": "John", // Required must be at least 2 characters
  "lastName": "Doe", // Required must be at least 2 characters
  "password": "test123" // Required must be at least 6 characters
}
```

Response:

```
{
  "message": "Save successful!",
  "user": {
    "id": 13,
    "email": "test@test.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### POST /auth/login

Request Body:

```
{
  "email": "test@test.com", // Required must be valid
  "password": "test123" // Required must be at least 6 characters
}
```

Response:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpZCI6MTMsImlhdCI6MTY0Mzg0MDkwNiwiZXhwIjoxNjQzODQ0NTA2fQ.4yIPfu73NF5fO9b-QB8uDkXuRfomNlSJW9IaMdpkong", // JWT expires in 1 hour
  "userId": 13
}
```

### GET /todo

Request Header:

```
Authorization: "Bearer JWT"
```

Response:

```
{
  "message": "Todos found!",
  "author": "John Doe",
  "todos": [
    {
      "id": 5,
      "title": "test",
      "description": "test todo",
      "deadline": "2022-02-03T09:00:00.000Z",
      "priority": "Medium"
    }
  ]
}
```

### POST /todo

Request Header:

```
Authorization: "Bearer JWT"
```

Request Body:

```
{
  "title": "test", // Required must be between 3 and 255 characters.
  "description": "test todo", // Required must be at least 5 characters.
  "deadline": "Thu Feb 03 2022 12:00:00 GMT+0300 (GMT+03:00)", // Required must be a valid date
  "priority": "Medium" // Required must be between 3 and 255 characters.
}
```

Response:

```
{
  "message": "Save successful!",
  "author": "John Doe",
  "todo": {
    "id": 5,
    "title": "test",
    "description": "test todo",
    "deadline": "2022-02-03T09:00:00.000Z",
    "priority": "Medium"
  }
}
```

### GET /todo/id

Request Header:

```
Authorization: "Bearer JWT"
```

Response:

```
{
  "message": "Todo found!",
  "author": "John Doe",
  "todo": {
    "id": 5,
    "title": "test",
    "description": "test todo",
    "deadline": "2022-02-03T09:00:00.000Z",
    "priority": "Medium"
  }
}
```

### PUT /todo/id

Request Header:

```
Authorization: "Bearer JWT"
```

Request Body:

```
{
  "title": "Cleaning", // Optional
  "description": "Clean house!", // Optional
  "deadline": "Thu Feb 03 2022 15:39:00 GMT+0300 (GMT+03:00)", // Optional
  "priority": "High" // Optional
}
```

Response:

```
{
  "message": "Update successful!",
  "author": "John Doe",
  "todo": {
    "id": 5,
    "title": "Cleaning",
    "description": "Clean house!",
    "deadline": "2022-02-03T12:39:00.000Z",
    "priority": "High"
  }
}
```

### DELETE /todo/id

Request Header:

```
Authorization: "Bearer JWT"
```

Response:

```
{
  "message": "Deleted!"
}
```

## Getting Started

### Prerequisites

You need to have a MySQL server running on local or cloud environment that can be accessed by an user that has necessary privileges. Required data to connect to database server can be seen in environment variables below.

Required environment variables are:
```
PORT=< Port of your choice, when empty defaults to 5000 >
DATABASE_HOST=< Host url of your database server >
DATABASE_PORT=< Port of your database server >
DATABASE_USERNAME=< Username for database connection >
DATABASE_PASSWORD=< Password for database connection >
DATABASE_NAME=< Name for your database >
PRIVATE_KEY=< Private key for JWT token >
```

### Installation

```
git clone git@github.com:GokhanTurgut/todo-api.git
npm install
npm run build
npm start
```

For running "dev" or "ts" scripts you need to make the changes below to ormconfig.js file:

```
entities: ["src/entities/**/*.ts"],
migrations: ["src/migration/**/*.ts"],
subscribers: ["src/subscriber/**/*.ts"],
cli: {
  entitiesDir: "src/entities",
  migrationsDir: "src/migration",
  subscribersDir: "src/subscriber",
},
```

After making the necessary changes to use nodemon:
```
npm run dev
```

For ts-node:
```
npm run ts
```

## License
[MIT](./LICENSE)