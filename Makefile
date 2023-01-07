make install:
	npm ci
make start:
	 npm run start & node ./server.js
make build:
	npm run build & node ./server.js
make start-server:
	npx nodemon ./server.js
