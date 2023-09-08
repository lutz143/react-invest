// require express, controllers and utils
const express = require('express');
const session = require('express-session');
const routes = require('./server/routes')

// require and set sequelize connnection
const sequelize = require('./server/config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const path = require('path');
// const exphbs = require('express-handlebars');
// const routes = require('./controllers');
// const helpers = require('./utils/helpers');
// const { ApolloServer } = require("apollo-server-express");


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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});




// const db = require("./server/config/connection");
// const { typeDefs, resolvers } = require("./server/schemas");

// const server = new ApolloServer({
  //   typeDefs,
//   resolvers, 
//   // context: authMiddleware,
//   persistedQueries: false, 
// });


// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
// };

// create a new instance of Apollo Server using GraphQL schema
// const startApolloServer = async (typeDefs, resolvers) => {
//   await server.start();
//   server.applyMiddleware({ app });

//   db.once("open", () => {
//     app.listen(PORT, () => {
//       console.log(`Server now running on port ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
//     });
//   });
// };

// start server
// startApolloServer(typeDefs, resolvers);