/**
* ErrorData.js
*
* @description :: This model represents the aggregation of error data for a host (or view).
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  beforeCreate: function (attrs, next) {
  },

  beforeUpdate: function (attrs, next) {
  },

  attributes: {

    host : {
      type: 'string',
      required: true
    },

  }
};
