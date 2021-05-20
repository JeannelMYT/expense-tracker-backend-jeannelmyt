# Expense Tracker App

A live version of this app is being run on [Heroku](https://expense-tracker-backend-jean.herokuapp.com/) and is meant to work with a [frontend that is running as a Digital Ocean App](https://expense-tracker-jeannelmyt-g2sqi.ondigitalocean.app/), and a MYSQL database running on a Digital Ocean server. Other than the database, both apps are running on free-tier servers so please excuse the slowness for which the app loads data.

## How to run locally 

This was made to run with [a frontend](https://github.com/JeannelMYT/expense-tracker-jeannelmyt) so please download and run that after running this in your server.

### Set up your database
Please set up a database to work with this app before running, I used MYSQL and have included the scripts under the docs folder, please run them in this order:
```
1. 00_createUser.sql
2. 01_createExpense.sql
3. 02_addForeignKeyConstraint.sql
```
**Then, _before running_, create a .env file to work with this and add in your database details**
`cp .env-example .env` 

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

### Clone the app
`git clone https://github.com/JeannelMYT/expense-tracker-backend-jeannelmyt.git`

### If you use npm
Install the app dependencies
`npm install`

Build the app
`npm run build`

Start the app
`npm run start`

### If you use yarn
Install the app dependencies
`yarn install`

Build the app
`yarn build`

Start the app
`yarn start`


After starting, navigate to `localhost:4000` on the browser and you should be directed to a page that just shows "Expense Tracker JeannelMYT is running!"


## Additional Notes

1. Localstorage is used in this case as usually people will enter expenses from the same device.

2. Ideally I would have preferred to have fixed widths for the react-table, but as I am unfamiliar with the library, I was unable to get this to work properly. 

3. Sorry for how bare it looks, design is not my forte. 

4. There are many things I would like to improve on this, (e.g. addition of automated tests, sending of emails for new account verification and password change).

## Credits

This project was bootstrapped with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This project also utilises the following libraries:
- [TypeOrm](https://www.npmjs.com/package/typeorm )
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Passport](https://www.npmjs.com/package/@nestjs/passport)
- [JWT](https://www.npmjs.com/package/@nestjs/jwt)
- [class-validator](https://github.com/typestack/class-validator)
