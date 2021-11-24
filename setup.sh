#!/usr/bin/env bash

cd ./frontend
  npm i
  npm run test
cd -

cd ./backend
  npm i
  npm run test:e2e
cd -