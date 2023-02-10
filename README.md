# ts-express
ExpressJS with typescript. It contains the initial boilerplate code for running a full fledged typescript project. Auth module is default integrated and can be easily customize accordingly  
## Tools
- Typescript
- Javascript
- Nodejs
- Express
- MongoDB
- Docker
- Docker compose

## Installtion
In the root directory run command
```
npm install
```
or
```
yarn
```
Add .env file in root directory, and should look like this
```
NODE_ENV = dev
PORT = 3000
JWT_SECRET = "your_secret"
JWT_EXPIRATION_ACCESS = "90d"
JWT_EXPIRATION_REFRESH = "365d"
ROOT_PATH = "http://localhost:3000/uploads/"
MONGO_URI = "mongodb://localhost:27017/db_name"
```
## Run Project
In root directory run the command.
```
yarn start:dev
```
or
```
npm run start:dev
```
