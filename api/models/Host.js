/**
* Hosts.js
*
* @description :: This model represents a host.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  beforeCreate: function (attrs, next) {
    console.log("Create hosts", attrs);
    next();
  },

  beforeUpdate: function (attrs, next) {
  },

  attributes: {

    name : {
      type: 'string',
      required: true
    }
  }
};
