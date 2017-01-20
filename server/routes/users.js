
const {authenticate} = require('../middleware/authenticate');
const {User} = require('../models/user');
const users = require('../controllers/usersController');

module.exports = (app) => {

  app.route('/users')
    .post((req, res) => {
      users.create(req, res);
    });

  app.route('/users/me')
    .get(authenticate, (req, res) => {
      res.send(req.user);
    });

  app.route('/users/login')
    .post((req, res) => {
      users.login(req, res);
    });

  app.route('/users/me/token')
    .delete(authenticate, (req, res) => {
      users.logout(req, res);
    });

};
