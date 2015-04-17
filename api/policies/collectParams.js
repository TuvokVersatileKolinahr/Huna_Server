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
    // or perhaps pass them on to the next call
    console.log(req.options.model);      // Model name - if you are using blueprints
    console.log(req.options.controller); // Controller name
    console.log(req.options.action);     // Action name
    next();
};