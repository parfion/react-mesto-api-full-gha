/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/handleError');
const router = require('./routes/index');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const app = express();
app.use(cors({ origin: ['http://localhost:3001', 'https://mesto.parfion.nomoredomainsrocks.ru'], credentials: true, maxAge: 30 }));
app.use(cookieParser());

mongoose.connect(`${MONGO_URL}`, {
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(express.json());

app.use('/api/', router);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
