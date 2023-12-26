const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnection = require('./dbConnection');
const path = require('path');
const router = require('./routes/router');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');
const requestLogger = require('./utils/requestLogger');
const errorHandler = require('./utils/errorHandler');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Static file serving
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Specify middleware
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger); // Make sure requestLogger middleware is defined and required
app.use('/router', router);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.group(`Server started on Port ${PORT}`);
});
