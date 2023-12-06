/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/handleError');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3002,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const app = express();
app.use(cors());
app.use(cookieParser());

mongoose.connect(`${MONGO_URL}`, {
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(express.json());

app.use(requestLogger);

app.use('/api/', router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
