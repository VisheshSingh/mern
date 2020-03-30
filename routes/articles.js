const express = require('express');
const router = express.Router();
const Articles = require('../models/articles');

router.get('/', (req, res) => {
  Articles.find()
    .then(article => {
      return res.json(article);
    })
    .catch(err => res.status(400).json({ message: err.message }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.timeLog(id);
  Articles.findById(id)
    .then(article => {
      return res.json(article);
    })
    .catch(err => res.status(400).json({ message: err.message }));
});

router.post('/add', (req, res) => {
  const { title, description, author } = req.body;
  const newArticle = new Articles({
    title,
    description,
    author
  });

  newArticle
    .save()
    .then(() => res.status(201).json({ message: newArticle }))
    .catch(err => res.status(400).json({ message: err.message }));
});

router.patch('/:id', (req, res) => {
  const { title, description, author } = req.body;
  Articles.findById(req.params.id)
    .then(article => {
      article.title = title || article.title;
      article.description = description || article.description;
      article.author = author || article.author;
      article
        .save()
        .then(() => res.status(200).json({ message: article }))
        .catch(err => res.status(400).json({ message: err.message }));
    })
    .catch(err =>
      res.status(400).json({ message: `Could not find article with that id` })
    );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Articles.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: 'DELETED!' }))
    .catch(err =>
      res.status(400).json({ message: `Could not delete article with that id` })
    );
});

module.exports = router;
