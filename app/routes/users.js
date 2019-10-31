'use strict';

var router = require('express').Router();
var UsersController = require('../controllers/users');

router.get('/', function(req, res) {
    UsersController.list(req, res);
});

router.get('/search', function(req, res) {
    UsersController.search(req, res);
});

router.get('/:id', function(req, res) {
    UsersController.show(req, res);
});

router.post('/', function(req, res) {
    res.send({ message: 'Vas a añadir un users' });
});

router.put('/:id', function(req, res) {
    res.send({ message: 'Vas a actualizar el users con id ' + req.params.id });
});

router.delete('/:id', function(req, res) {
    res.send({ message: 'Vas a borrar el users con id ' + req.params.id});
});

module.exports = router;