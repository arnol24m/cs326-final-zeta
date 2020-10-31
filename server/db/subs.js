'use strict';

// fake subscription database

const sizes = require('./fakeSizes');
const faker = require('faker');
faker.seed(194);

const subs = [];
for (let i = 0; i < sizes.subs; ++i) {
    subs.push({
        id: i,
        user_id: faker.random.number(sizes.users - 1),
        calendar_id: faker.random.number({ min: sizes.users, max: sizes.cals - 1 })
    });
}

exports.listAll = function(req, res) {
    res.json(subs);
};

exports.loadUser = function(req, res, next) {
    req.subs = subs.filter(sub => sub.user_id === req.user.id);
    next();
};

exports.list = function(req, res) {
    res.json(req.subs);
};

exports.create = function(req, res) {
    res.sendStatus(201);
};

exports.find = function(req, res) {
    const id = parseInt(req.params.sub, 10);
    if (subs[id] && subs[id].user_id === req.user.id) {
        res.json(subs[id]);
    } else {
        res.sendStatus(404);
    }
};

exports.remove = function(req, res) {
    res.sendStatus(204);
};

exports.loadCalendar = function(req, res, next) {
    req.subs = subs.filter(sub => sub.calendar_id === req.cal.id);
    next();
};