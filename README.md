# appiness-task-one
# MONGODB, EXPRESSJS, NODEJS

### VERSIONS

# NODEJS => 10
# MONGODB => 3.6.2
# EXPRESSJS => 4.17.1

### RUN THE PROJECT

1. Run `npm install` to install server dependencies.

2. Run `MONGODB_URI="mongodb://localhost:27017t/db-name" PORT=5000 nodemon app.js` to start the server

### CREATE USERS

-  METHOD: POST
-  URL: /api/users
-  BODY: application/json
-  EXAMPLE: {
	"first_name": "Balaji",
	"last_name": "KR",
	"email": "balajicrazyon@gmail.com",
	"password": "hello1@",
	"gender": 1,
	"country_code":"+91",
	"phone": "9629676900"
   }

# FIRST USER ROLE AS ADMIN AND ANOTHER REST OF USERS ARE(CONSIDER AS VENDORS)

# USERS COLLECTIONS (BASIC USER DETAILS)

# IN USER_ROLES COLLECTIONS. (FIRST USER AS ADMIN)