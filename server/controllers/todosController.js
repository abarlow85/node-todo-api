const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {Todo} = require('../models/todo');


class TodosController {

  getAll(req, res) {
    Todo.find({_creator: req.user._id}).then(todos => {
      res.send({todos});
    }, e => {
      res.status(400).send(e);
    });
  }

  getOne(req, res) {
    const {id} = req.params;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send({});
    }

    Todo.findOne({
      _id: id,
      _creator: req.user._id
    }).then(todo => {
        if (!todo) {
          return res.status(404).send({});
        }

        res.send({todo});

      }, e => {
        res.status(400).send({});
      });
  }

  create(req, res) {
    const todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    });

    todo.save().then((doc) => {
      res.status(200).send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  }

  update(req, res) {
    const {id} = req.params;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
      return res.status(404).send({});
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, { new: true})
      .then(todo => {
        if (!todo) {
          return res.status(404).send();
        }

        res.send({todo});

      }).catch(e => {
        res.status(400).send();
      });
  }

  remove(req, res) {
    const {id} = req.params;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send({});
    }

    Todo.findOneAndRemove({_id: id, _creator: req.user._id})
      .then(todo => {
        if (!todo) {
          return res.status(404).send({});
        }
        res.send({todo});
      }, e => {
        res.status(400).send({});
      });
  }
}

module.exports = new TodosController();
