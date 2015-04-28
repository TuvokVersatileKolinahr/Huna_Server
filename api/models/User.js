/**
* User.js
*
* @description :: A user is using the system, can login and have an optional role
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  hash_string: function (text) {
    var crypto = require('crypto');
    var hashed = crypto.createHash('md5').update(text).digest('hex');
    return hashed;
  },

  beforeCreate: function (attrs, next) {
    attrs.password = this.hash_string(attrs.password);
    // delete attrs['retypepassword'];
    next();
  },

  beforeUpdate: function (attrs, next) {
    // console.log("attrs", attrs);
    // attrs.password = this.hash_string(attrs.password);
    // delete attrs['retypepassword'];
    next();
  },

  attributes: {

    username : {
      type: 'string',
      minLength: 6,
      notEmpty: true,
      unique: true,
      required: true
    },

    email : {
      type: 'email',
      required: true,
      unique: true
    },

    password : {
      type: 'string',
      required: true,
      minLength: 6
    },

    last_login : { type: 'datetime' },
    token: { type: 'string' }
  }
};

