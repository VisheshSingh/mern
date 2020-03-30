const express = require('express');
const mongoose = require('mongoose');
const cors = require('express');

require('dotenv').config(); // BRING IN THE ENV VARIABLES 🖖

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/', require('./routes/articles'));

const connection = mongoose.connection;
connection.once('open', () => console.log(`MONGODB successfully connected 😎`));

app.listen(port, () => console.log(`App is running on PORT: ${port}...`));
