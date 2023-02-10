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
# Node env
NODE_ENV=dev

# Port number
PORT=300-

# File Paths
ROOT_PATH=http://localhost:5000/uploads/
WRITE_PATH=public/uploads

# Mongo Url
MONGODB_URL="user-mongodb-url"

# JWT
# JWT secret key -- TYtaGSPFKiutyVtPIhzR
JWT_SECRET=TYtaGSPFKiutyVtPIhzR
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_DAYS=90
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=182
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
