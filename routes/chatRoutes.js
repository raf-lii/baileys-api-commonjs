const express = require('express')
const { body, query } = require('express-validator');
const request = require('./../middlewares/requestValidator.js')
const session = require('./../middlewares/sessionValidator.js')
const chat = require('./../controllers/chatController.js')
const message = require('./../controllers/getMessages.js')

const router = express.Router()

router.get('/get', query('id').notEmpty(), request, session, chat.getList)

// router.get('/get/:jid', query('id').notEmpty(), request, session, message.getMessages)

router.post(
    '/send',
    query('id').notEmpty(),
    body('receiver').notEmpty(),
    body('message').notEmpty(),
    request,
    session,
    chat.send
)

router.post(
    '/send-image',
    query('id').notEmpty(),
    body('receiver').notEmpty(),
    body('message').notEmpty(),
    request,
    session,
    chat.sendImage
)

// router.post('/send-bulk', query('id').notEmpty(), request, session, chat.sendBulk)

module.exports = router