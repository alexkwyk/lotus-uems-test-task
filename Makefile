make install:
	npm ci
make start:
	npx nodemon ./server.js | npm start
make build:
	npx nodemon ./server.js | npm build
make start-server:
	npx nodemon ./server.js