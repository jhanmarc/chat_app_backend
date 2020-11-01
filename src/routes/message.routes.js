const { Router } = require('express');
const router = Router();

const cc = require('../controllers')

router.get('/:from', cc.Messages.getChat)

module.exports = router;