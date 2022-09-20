const { response } = require('express');
const db = require('../models/kiraModels');

console.log('controller');
// const testGet = `SELECT * FROM cards WHERE id=1;`;
// db.query(testGet).then((response) => console.log(response.rows));

const kiraController = {};

kiraController.getCards = (req, res, next) => {
  console.log('I am in the get cards controller');
  const cards = `SELECT * FROM cards;`;
  db.query(cards)
    .then((response) => {
      res.locals.cards = response.rows;
      console.log('the cards are ');
      console.log(res.locals.cards);
      next();
    })
    .catch((err) => {
      console.log('we are here');
      console.error(err);
    });
};

kiraController.getOneCard = (req, res, next) => {
  console.log('I am in get one card contoller');
  console.log(req.body);
  const values = [req.body.id];
  const text = `SELECT * FROM cards WHERE id=$1`;
  db.query(text, values)
    .then((response) => {
      //console.log(response);
      res.locals.getOneCard = response.rows;
      next();
    })
    .catch((err) => console.error(err));
};

kiraController.addCards = (req, res, next) => {
  console.log('I am in the add cards controller');
  const id = `SELECT id FROM cards ORDER BY ID DESC LIMIT 1;`;
  db.query(id).then((response) => {
    const currentId = response.rows[0].id + 1;
    // console.log(currentId);
    //next();
    // console.log(req.body);
    const values = [
      currentId,
      req.body.title,
      req.body.description,
      req.body.assignee,
      req.body.status,
      req.body.priority,
      req.body.story_points,
      req.body.due_date,
      req.body.creation_date,
    ];
    // console.log(values);
    const text = `INSERT INTO cards(id, title, description, assignee, status, priority, story_points, due_date, creation_date) 
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

    db.query(text, values)
      .then((repsonse) => {
        next();
      })
      .catch((err) => {
        console.error(err);
        console.error('Error in adding the cards');
      });
  });
};

kiraController.deleteCards = (req, res, next) => {
  console.log('I am in the delete controller');
  console.log(' I am finally here');
  console.log('The task ID is ' + req.body.id);
  const values = [req.body.id];
  const text = `DELETE FROM cards WHERE id=$1;`;
  db.query(text, values)
    .then((repsonse) => next())
    .catch((err) => console.error(err));
};

kiraController.editCards = (req, res, next) => {
  console.log('I am in the edit cards controller');
  next();
};

module.exports = kiraController;
