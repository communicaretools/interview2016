var express = require('express');
var request = require('supertest');
var requireToken = require('./requireToken');
var tokens = require('./tokens');
var testApp = require('../test-app');

describe('The requireToken middleware', function () {
    var validToken = tokens.create({userid: 'abcdef'});
    var invalidToken = 'asdf';

    describe('when encountering a request without a Bearer token', function () {
        it('should return a 403 with information on where to find the auth action', function (done) {
            var app = request(express().use(requireToken));
            app.get('/')
               .expect(403, {login: '/api/auth/session'})
               .end(testApp.end(done));
        });
    });

    describe('when encountering a request with an invalid Bearer token', function () {
        it('should return a 403 with information on where to find the auth action', function (done) {
            var app = request(express().use(requireToken));
            app.get('/')
               .set('Authorization', 'Bearer ' + invalidToken)
               .expect(403, {login: '/api/auth/session'})
               .end(testApp.end(done));
        });
    });

    describe('when encountering a request with a valid Bearer token', function () {
        it('should execute the action', function (done) {
            var app = request(express().use(requireToken).get('/', function (req, res) { res.status(200).send('user: ' + req.userid); }));
            app.get('/')
               .set('Authorization', 'Bearer ' + validToken)
               .expect(200, 'user: abcdef')
               .end(testApp.end(done));
        });
    });
});
