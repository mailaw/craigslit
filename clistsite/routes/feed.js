var express = require('express');
var router = express.Router();

// Require controller modules.
var entry_controller = require('../controllers/entryController');

/// ENTRY ROUTES ///

// GET request for list of all entry items.
router.get('/feed', entry_controller.entry_list);


module.exports = router;
