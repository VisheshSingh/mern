const express = require('express');
const router = express.Router();
const Articles = require('../models/articles');

router.get('/', (req, res) => {
  Articles.find()
    .then(article => {
      return res.json(article);
    })
    .catch(err => res.status(400).json({ message: `${err}` }));
});

module.exports = router;
