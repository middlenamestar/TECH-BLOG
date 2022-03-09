const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

// initalize sequelize with session store.
var SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require('./controllers')
const sequelize = require('./config/connection');
// helpers if using.

const app = express();
const PORT = process.env.PORT || 3001;

// sets up session and connect to our sequelize db.
const sess = {
    secret: 'super meow secret',
    // express session will use cookies by default, but we can specify options for those cookies by adding a cookies property to our session options.
    cookie: {
      // maxAge sets the maximum age for the session to be active. listed in milliseconds.
      maxAge: 86400,
      // httpOnly tells express-session to only store session cookies when the protocol being used to connect to the server is HTTP.
      // httpOnly: true,
      // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. having this set to true, and running a server without encryption will result in the cookies not showing up in your developer console.
      // secure: false,
      // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
      // sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    // sets up session store
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

app.use(session(sess));

// const hbs = exphbs.create({ helpers });

// app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(()=>{
    app.listen(PORT, () => {
        console.log(`server listening at http://localhost:${PORT}`)
    });
});