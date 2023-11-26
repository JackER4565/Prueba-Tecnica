require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const router = require('./mainRoutes');
const db = require('./db');

// Conecta a la base de datos MySQL
db.connect((err) => {
    if (err) {
      console.error('Error connecting to DB', err);
      return;
    }
    console.log('MySQL DB connection OK');
  });
  
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});