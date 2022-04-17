# Project Title

Bids Management system

# Project Desription 
In this project i take project as a items

Project will be created by a user and other users will bid on it.

Projects list will be shown to all users.

Project have start and end time and during that time only the user can place a bid.Users can bid only if the bid is active. 

User can also update his bid after placing the bid. Only can update the bid if the bid is active. 

user can also see project list on which he bids.

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.



### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---


## Running the project
    $ install yarn

    $ node bidsManagemet.js

    or

    $ nodemon bidsManagemet.js


# .env file format

JWT_SECRETKEY=""(Your Jwt Secret Key)
JWT_TOKEN_EXPIRE_TIME=""  (Token expire time, example="2h","3h")
DEVELOPMENT_DB_USERNAME="" (Deveopment database user name)
DEVELOPMENT_DB_PASSWORD="" (Deveopment database password)
DEVELOPMENT_DB_DATABASE=""  (Deveopment database name)
DEVELOPMENT_DB_HOST=""  (Deveopment database host, example="127.0.0.1")

TEST_DB_USERNAME="" (Test database user name)
TEST_DB_PASSWORD=""   (Test database password)
TEST_DB_DATABASE=""   (Test database name)
TEST_DB_HOST=""    (Test database host, example="127.0.0.1")

PRODUCTION_DB_USERNAME=""  (Production database user name)
PRODUCTION_DB_PASSWORD=""  (Production database password)
PRODUCTION_DB_DATABASE=""   (Production database name)
PRODUCTION_DB_HOST="" (Production database host, example="127.0.0.1")

DB_ENV=""  (set db env here, example=development or test or production)


# Apis documentation

Api name=> userSignup (User will signup through this api)

Api name=> userLogin (User will login through this api)

Api name=> createProject (User will create project through this api)

Api name=> projectsList (User will see others projects and their user detail through this api ,user will not see their own added project in this api user will see their own projects through myProjects api)

Api name=> myProjectsList (User will see thier own projects and users who placed bid on it through this api.)

Api name=> placeBid (User will place bid with this api, user can not bid to their own project, user can place bid if bid is active based on bid start time and end time)

Api name=> projectBidList (user can see project lsitings and their bids and their user details)

Api name=> updateBid (User can update their bid with this api, user can not update their bid to their own project, user can update bid if bid is active based on bid start time and end time)

Api name=> myBids (User can see their bids on which project they bided)

