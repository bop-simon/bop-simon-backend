const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: true,
  credentials: true,
  preflightContinue: true,
  exposedHeaders: ['Set-Cookie']
}));

// App routes

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/profiles', require('./controllers/profiles'));
app.use('/api/v1/usersongs', require('./controllers/favsongs'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

//['http://localhost:7891', 'localhost:7891', 'https://bop-simon-prod.netlify.app'],
