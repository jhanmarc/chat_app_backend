const { Router } = require('express');
const router = Router();

const cc = require('../controllers')

router.get('/', cc.Users.getUsers)



module.exports = router;
