# Joken PO!

It's a simple rock, paper scissor game
you can simply run `./setup.sh` to install all dependencies and run all tests available

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

