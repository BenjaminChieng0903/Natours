const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
  role: {
    type: String,
    enum: ['user', 'admin', 'guide', 'lead-guide'],
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
});
//encrypt password after change the password or create the new document
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  //   console.log('pre 1');
  const cryptedPassword = bcrypt.hash(this.get('password'), 12);
  this.password = await cryptedPassword;
  this.passwordConfirm = undefined;
  next();
});
//set changePasswordAt after change password
userSchema.pre('save', function (next) {
  //   console.log('pre 2');
  //if password not be modified or create the new document
  if (!this.isModified('password') || !this.isNew) return next();
  this.changePasswordAt = Date.now();
  next();
});
userSchema.methods.createResetToken = function () {
  const plainToken = crypto.randomBytes(32).toString('hex');

  const encryptedResetToken = crypto
    .createHash('sha256')
    .update(plainToken)
    .digest('hex');
  // we store the encrypted token into database
  this.resetPasswordToken = encryptedResetToken;
  //set expireTime to 15min
  this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000;
  //   console.log(this.resetPasswordTokenExpire);
  return plainToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
