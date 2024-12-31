// require express, controllers and utils
const express = require('express');
const session = require('express-session');
const routes = require('./server/routes');
const cors = require('cors');

// require and set sequelize connnection
const sequelize = require('./server/config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// create a cookie session with a timed logout
const sess = {
    secret: 'Super secret secret',
    cookie: {
        // maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});