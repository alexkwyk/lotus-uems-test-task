make install:
	npm ci
make start:
	 npm run start & npx nodemon ./server.js
make build:
	npm run build & npx nodemon ./server.js
make start-server:
	npx nodemon ./server.js
