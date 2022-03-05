const express = require('express')
const { body } = require('express-validator');
const request = require('./../middlewares/requestValidator.js')
const session = require('./../controllers/sessionController.js')

const router = express.Router()

router.get('/find/:id', session.find)

router.post('/add', body('id').notEmpty(), body('isLegacy').notEmpty(), request, session.add)

// router.delete('/delete/:id', session.del)

module.exports = router