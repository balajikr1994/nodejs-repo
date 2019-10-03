### SPRITLE TASK
### NODEJS => v10.16.0, MONGODB => v3.6.2, EXPRESSJS => v4.17.1

```     
1. `users model`
2. `posts model`
3. `comments model`
```

```
    Example database images are in img folder
```

### TECHNOLOGIES USED

1. `ES6 With BabelJS`
2. `encrypt the users password with salt`,
2. `Mongoose ODM`
3. `PassportJS`
    i. `Basic Strategy`
    ii. `Client-password strategy`
4. `Express Validator`
5. `OAuth2`
6. `JWT`
7. `AWS S3` for image uploads
8. `Multipart middleware`
9. `Winston for logger`

### RUN THE PROJECT

1. Run `npm install` && `npm i -g nodemon` to install server dependencies.

2. Run `MONGODB_URI="mongodb://localhost:27017/" PORT=5000 IP="0.0.0.0" PROJECT_ID="1" CLIENT_ID="XXXX " CLIENT_SECRET=XXXX accessTokenSecret="XXXX" refreshTokenSecret="XXXX" S3_KEY_ID="XXXXX"  S3_SECRET="XXXXX"  S3_BUCKET="XXXX" S3_REGION="XXXX" TMP="\tmp" nodemon app.js` to start the server

