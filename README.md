# Authentication and Authorization with NestJS

Example implementation of authentication and authorization with NestJS.

# How to run

1. Run `npm install` to install project dependencies
2. Run `docker-compose up -d`/`docker-compose start` depending if this is or not the first time starting the docker containers
3. Copy and paste the contents from `data/aws/user-pools` to the generated `data/docker/volumes/cognito/db` folder and restart the `cognito-local` service with `docker-compose restart cognito-local`
4. Run `npm run fixtures` to populate tables with test data
5. Run `npm run start:dev`
6. Use the postman collection inside `data/postman` to play with the API

# How this works

This API has 3 resources, users, posts and roles. Users can have one of two roles, `User` or `Admin`.

An `User` can:

- Read posts
- Create posts
- Update his own posts
- Delete his own posts
- Read users
- Update his own user data
- Delete his own user data

An `Admin` can do all CRUD actions on all resources.
