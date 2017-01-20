const {ObjectID} = require('mongodb');
const _ = require('lodash');
const {authenticate} = require('../middleware/authenticate');
const {Todo} = require('../models/todo');
const todos = require('../controllers/todosController');

module.exports = (app) => {

  app.route('/todos')
    .get(authenticate, (req, res) => {
      todos.getAll(req, res);
    })
    .post(authenticate, (req, res) => {
      todos.create(req, res);
    });

  app.route('/todos/:id')
    .get(authenticate, (req, res) => {
      todos.getOne(req, res);
    })
    .patch(authenticate, (req, res) => {
      todos.update(req, res);

    })
    .delete(authenticate, (req, res) => {
      todos.remove(req, res);
    });

};
