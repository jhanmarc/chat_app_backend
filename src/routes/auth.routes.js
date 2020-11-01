const { Router } = require('express');
const { check } = require('express-validator');
const router = Router()

const { validateItem } = require('../middleware/validators')
const verifyTJWT = require('../middleware/jwt')

const cc = require('../controllers')

router.post('/login',[
    check('email', 'El email debe ser valido').isEmail().not().isEmpty(),
    check('password', 'La contraseña debe se mayor a 6 caracteres').not().isEmpty().isLength({min:6}),
    validateItem
], cc.Auth.login)

router.post('/register',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser valido').isEmail().not().isEmpty(),
    check('password', 'La contraseña debe se mayor a 6 caracteres').not().isEmpty().isLength({min:6}),
    validateItem
], cc.Auth.register)

router.get('/renew', verifyTJWT.verifyToken ,cc.Auth.renewToken)


module.exports = router;