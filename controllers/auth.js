const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//User Signup
exports.signup = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        password: hashedPw,
        name: name
      });
      return user.save();
    })
    .then(result => {
      res.status(201);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 501;
      }
      next(err);
    });
};

//User.login
exports.login = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ name: name })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          name: loadedUser.name,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ 
        status: "LOGGED IN",
        userData: {
          userId: loadedUser._id.toString(),
          user_name:loadedUser.name 
        },
        access_token: token
         
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};