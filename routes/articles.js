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

router.get('/:id', getArticle, (req, res) => {
  //    METHOD 1
  //   Articles.findById(id)
  //     .then(article => {
  //       return res.json(article);
  //     })
  //     .catch(err => res.status(400).json({ message: err.message }));

  // METHOD 2
  res.json(res.article);
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
    .then(() => res.status(201).json(newArticle))
    .catch(err => res.status(400).json({ message: err.message }));
});

router.patch('/:id', getArticle, async (req, res) => {
  const { title, description, author } = req.body;
  // METHOD 1
  //   Articles.findById(req.params.id)
  //     .then(article => {
  //       article.title = title || article.title;
  //       article.description = description || article.description;
  //       article.author = author || article.author;
  //       article
  //         .save()
  //         .then(() => res.status(200).json({ message: article }))
  //         .catch(err => res.status(400).json({ message: err.message }));
  //     })
  //     .catch(err =>
  //       res.status(400).json({ message: `Could not find article with that id` })
  //     );

  // METHOD 2
  try {
    // console.log();
    // if (title !== null) {
    //   res.article.title = title;
    // }
    // if (description !== null) {
    //   res.article.description = description;
    // }
    // if (author !== null) {
    //   res.article.author = author;
    // }
    title
      ? (res.article.title = title)
      : (res.article.title = res.article.title);
    description
      ? (res.article.description = description)
      : (res.article.description = res.article.description);
    author
      ? (res.article.author = author)
      : (res.article.author = res.article.author);
    const updatedArticle = await res.article.save();
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(500).json({ message: 'COULD NOT UPDATE!' });
  }
});

router.delete('/:id', getArticle, async (req, res) => {
  // METHOD 1
  //   const { id } = req.params;
  //   Articles.findByIdAndDelete(id)
  //     .then(() => res.status(200).json({ message: 'DELETED!' }))
  //     .catch(err =>
  //       res.status(400).json({ message: `Could not delete article with that id` })
  //     );

  // METHOD 2
  try {
    await res.article.remove();
    res.status(200).json({ message: 'DELETED!' });
  } catch (err) {
    res.status(500).json({ message: 'COULD NOT DELETE!' });
  }
});

async function getArticle(req, res, next) {
  let article;
  try {
    article = await Articles.findById(req.params.id);
    if (!article) {
      return res.status(400).json({ message: 'Cannot find article' });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  res.article = article;
  next();
}

module.exports = router;
