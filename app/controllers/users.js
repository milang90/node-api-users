'use strict';

var UsersModel = require('../models/users');

const UsersController = {
    search: function (req, res) {
        var q = req.query.q;
        UsersModel.find({ $text: { $search: q } }, function(err, users) {
            if(err) {
                return res.status(500).send({
                    message: 'Error en la búsqueda'
                });
            }
            return res.status(200).send(users);
        });
    },
    list: function(req, res) {
        UsersModel.find(function(err, users){
            if(err) {
                return res.status(500).send({
                    message: 'Error obteniendo los usuario'
                });
            }
            return res.status(200).send(users);
        });
    },
    show: function(req, res) {
        var id = req.params.id;
        UsersModel.findOne({_id: id}, function(err, users){
            if(err) {
                return res.status(500).send({
                    message: 'Se ha producido un error al obtener el usuario'
                });
            }
            if(!users) {
                return res.status(404).send( {
                    message: 'No tenemos este usuario'
                });
            }
            return res.send(users);
        });
    },
    create: function(req, res) {
        var users = new UsersModel (req.body);
        UsersModel.save(function(err, users){
            if(err) {
                return res.status(500).send( {
                    message: 'Error al guardar el usuario',
                    error: err
                });
            }
            return res.status(201).send({
                message: 'saved',
                _id: users._id
            });
        });
    },
    update: function(req, res) {
        var id = req.params.id
        UsersModel.findOne({_id: id}, function(err, users){
            if(err) {
                return res.status(500).send({
                    message: 'Se ha producido un error al guardar el usuario',
                    error: err
                });
            }
            if(!users) {
                return res.status(404).send({
                    message: 'No hemos encontrado el usuario'
                });
            }
            users.name = req.body.name;
            users.email =  req.body.email;
            UsersModel.save(function(err, users){
            if(err) {
                return res.status(500).send({
                    message: 'Error al guardar el usuario'
                });
            }
            if(!users) {
                return res.status(404).send({
                    message: 'No hemos encontrado el usuario'
                });
            }
                return res.status(201).send(users);
            });
        });
    },
    remove: function(req, res) {
        var id = req.params.id
        UsersModel.findByIdAndRemove(id, function(err, users){
            if(err) {
                return res.send(500, {
                    message: 'No hemos encontrado el usuario'
                });
            }
            return res.status(201).send(users);
        });
    }
};

module.exports = UsersController;