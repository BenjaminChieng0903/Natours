const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ['A user must have a name', true],
    unique: true,
  },
  email: {
    type: String,
    required: ['A user must have a email', true],
    unique: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  password: {
    type: String,
    required: ['A user must have a password', true],
    minlength: 8,
    validate: {
      validator: function (p) {
        return '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$'.test(
          p
        );
      },
      message: (props) => `${props.value} is not a valid password`,
    },
  },
  passwordConfirm: {
    type: String,
    require: ['please confirm your password', true],
  },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
