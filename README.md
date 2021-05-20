# Expense Tracker App

A live version of this app is being run on [Heroku](https://expense-tracker-backend-jean.herokuapp.com/) and is meant to work with a [frontend that is running as a Digital Ocean App](https://expense-tracker-jeannelmyt-g2sqi.ondigitalocean.app/), and a MySQL database running on a Digital Ocean server. Other than the database, both apps are running on free-tier servers so please excuse the slowness for which the app loads data.

If you would like to test this without the frontend, I have provided a Postman collection of all the APIs in this project under the [docs](https://github.com/JeannelMYT/expense-tracker-backend-jeannelmyt/tree/main/docs) folder, just change all the variables to the appropriate values. This postman collection can be used when run locally or calling from the Heroku server.

## How to run locally

This was made to run with [a frontend](https://github.com/JeannelMYT/expense-tracker-jeannelmyt) so please download and run that after running this in your server.

### Clone the app and navigate to the folder

```
git clone https://github.com/JeannelMYT/expense-tracker-backend-jeannelmyt.git

cd expense-tracker-backend-jeannelmyt/
```

### Set up your database

Please set up a database to work with this app before running, I used MYSQL and have included the scripts under the docs folder, please run them in this order:

```
1. 00_createUser.sql
2. 01_createExpense.sql
3. 02_addForeignKeyConstraint.sql
```

**Then, _before running_, create a .env file to work with this and add in your database details**

```
cp .env-example .env
```

And edit the details:

```
#DATABASE
DB_TYPE=mysql
DB_HOST=***CHANGE TO DATABASE HOSTNAME***
DB_PORT=3306
DB_USERNAME=***CHANGE TO DATABASE USERNAME***
DB_PASSWORD=***CHANGE TO DATABASE PASSWORD***
DB_NAME=***CHANGE TO DATABASE NAME***

#JWT
JWT_SECRET=***CHANGE TO JWT STRING (but any string would work, this only matters if you're running it on an internet connected server)***
```

### If you use npm:

Install the app dependencies and build the app:
`npm install`

Start the app:
`npm run start`

### If you use yarn:

Install the app dependencies and build the app:
`yarn install`

Start the app:
`yarn start`

**After starting, navigate to `localhost:4000` on the browser and you should be directed to a page that just shows "Expense Tracker JeannelMYT is running!"**

## Additional Notes

1. I set the number of username characters to maximum of 12. Just wanted to have a maximum characters for at least one field and the username made sense to me at the time. 

2. There are many things I would like to improve on this, (e.g. addition of automated tests, sending of emails for new account verification and password change), but am unable to do so at this point in time due to time constraint.

## Credits

This project was bootstrapped with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This project also utilises the following libraries:

- [TypeOrm](https://www.npmjs.com/package/typeorm)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Passport](https://www.npmjs.com/package/@nestjs/passport)
- [JWT](https://www.npmjs.com/package/@nestjs/jwt)
- [class-validator](https://github.com/typestack/class-validator)
