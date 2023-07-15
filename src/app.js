
require('@babel/register');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const passport = require('passport'); 

// Cookies && Session
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// Setup sessio
const sessionConfig = {
  name: 'solo',
  secret: process.env.COOKIE_SECRET,
  store: new FileStore({}),
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
};

// eslint-disable-next-line import/order
const { createApi } = require('unsplash-js');
const nodeFetch = require('node-fetch');
const { toJson } = require('unsplash-js');

// global.fetch = nodeFetch;
const unsplash = createApi({
  accessKey: process.env.MY_ACCESS_KEY,
  fetch: nodeFetch,
});

const app = express();

// Import routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const privateRouter = require('./routes/private');

require('./googleAuth');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static(path.resolve('public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// * Middliware для просмотря что передается в req.session.user
// app.use((req, res, next) => { console.log(req.session.user); next(); });
// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/private', privateRouter);

// TODO: Перенести это в роут картинок
app.post('/api/searchTerms', async (req, res) => {
  const { userRequest } = req.body;
  console.log('userRequest ',userRequest);
  const data = userRequest.toLowerCase();
  console.log('data app.js',data);
  unsplash.search.getPhotos({
    query: data,
    page: 2,
    perPage: 30,
  })
    .then(toJson)
    .then((json) => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log('Error --> ', err);
      res.status(500).send({ message: err });
    });
  // res.sendStatus(200);
});

const PORT = process.env.PORT ?? 8888;
app.listen(PORT, () => {
  console.log('Веб-сервер слушает порт', PORT);
});
