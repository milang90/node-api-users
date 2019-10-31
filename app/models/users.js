'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usersSchema = new Schema({
  name: String, 
  email: String, 
});

var usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;