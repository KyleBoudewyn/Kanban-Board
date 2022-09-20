const express = require('express');

const kiraController = require('../controllers/kiraController');

const router = express.Router();

router.get('/getCard', kiraController.getCards, (req, res) =>
  res.status(200).json(res.locals.cards)
);

router.post('/getOneCard', kiraController.getOneCard, (req, res) =>
  res.status(200).json(res.locals.oneCard)
);

router.post('/card', kiraController.addCards, (req, res) =>
  res.status(200).json(res.locals.newCard)
);

router.delete('/deleteCards', kiraController.deleteCards, (req, res) =>
  res.status(200).json(res.locals.deleteCard)
);

router.put('/editCards', kiraController.editCards, (req, res) =>
  res.status(200).json(res.locals.editCard)
);

module.exports = router;
