const express = require('express');
const router = express.Router();
const warecontrollers = require('../controllers/filmecontroller');

router.get('/', warecontrollers.filme_list);

module.exports = router; 