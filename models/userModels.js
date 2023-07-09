const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(p);
      },
      message: (props) => `${props.value} is not a valid password`,
    },
  },
  passwordConfirm: {
    type: String,
    required: ['please confirm your password', true],
    validate: {
      validator: function (p) {
        return this.get('password') === p;
      },
      message: 'Password does not match, try again!',
    },
  },
  changePasswordAt: Date,
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  //   console.log(this.get('password'));
  const cryptedPassword = bcrypt.hash(this.get('password'), 12);
  this.password = await cryptedPassword;
  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
