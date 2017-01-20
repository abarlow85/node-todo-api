const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {User} = require('../models/user');

class UsersController {
  create(req, res) {
    const {email, password} = req.body;

    const user = new User({email, password});

    user.save().then(() => {
      return user.generateAuthToken();
    }).then(token => {
      res.header('x-auth', token).send(user);
    }).catch(e => {
      res.status(400).send(e);
    });
  }

  login(req, res) {
    const {email, password} = req.body;

    User.findByCredentials(email, password).then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    }).catch(e => {
      res.status(400).send();
    });
  }

  logout(req, res) {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    });
  }
}

module.exports = new UsersController();
