/**
 * collectParams
 *
 * @module      :: Policy
 * @description :: Simple policy to collect all parameters
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {
    var criteria = {};

    // collect all params
    criteria = _.merge({}, req.params.all(), req.body);
    // store the criteria somewhere for later use
    // The values in req.options.values are used as defaults for the request
    if(!req.options.values)
      req.options.values = {};
    
    req.options.values.criteria = criteria;

    console.log(req.options.model);      // Model name - if you are using blueprints
    console.log(req.options.controller); // Controller name
    console.log(req.options.action);     // Action name
    next();
};