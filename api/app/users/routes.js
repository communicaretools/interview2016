var router = require('express').Router();
var requireToken = require('../auth/requireToken');
var User = require('./User');

// Ensure we'll always be authenticated in this part of the api
router.use(requireToken);

// Fill in routes for the user resource here...

module.exports = router;
