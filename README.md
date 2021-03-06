# Joken PO!

It's a simple rock, paper scissor game
you can simply run `./setup.sh` to install all dependencies and run all tests available,
the setup is going to install all dependencies and run all tests.

The bundle is available on the `/bundle` folder, although you would need a static file server for the front-end and a node server for the backend to run it. 

> To run frontend tests

cd `/frontend` and install all node dependencies
and run `npm run test`

> Running backend tests

go over the `/backend` folder with node dependencies installed
- `npm run test` for unit tests
- `npm run test:e2e` to integration tests
## Playing on the terminal

Go to the `/backend` folder and execute to play against machine
```bash
node cli bet --move="ROCK"
node cli bet --move="PAPER"
node cli bet --move="SCISSOR"
```

## Setting it up
we are using a proxy, so just start backend and frontend would be enough to use this application. 

install the frontend dependencies and start
```bash
cd frontend
npm install
npm start
```

install backend dedendencies and start
```bash
cd backend
npm install
npm start
```
## Stack decision
- React
> Since Its a requirement, although only create react app and a proxy is being used as dependency. 
> I usually try to minimise the use of dependencies since they sometimes can have virus and require to be upgraded from times to times.
- NestJS
> A really great framework, it mimics angular way of development for the frontend, on the background its running a simple express, 
> although It's easily switchable.

## Additional notes.
I'm using a library called `class-validator` to handle the request validations, and `@squareboat/nest-console` to handle the CLI.
apart from those libraries no other dependency was used.

for testing only components with business logic are tested. 
I'm using msw to simulate the server instead of mocking fetch.

