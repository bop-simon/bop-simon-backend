const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: ['http://localhost:7891', 'localhost:7891', 'https://bop-simon-prod.netlify.app'],
  credentials: true,
  preflightContinue: true,
  exposedHeaders: ['Set-Cookie']
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', ['http://localhost:7891', 'localhost:7891', 'https://bop-simon-prod.netlify.app']);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
// App routes

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/profiles', require('./controllers/profiles'));
app.use('/api/v1/usersongs', require('./controllers/favsongs'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
