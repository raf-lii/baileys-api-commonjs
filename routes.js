const express = require('express')
const session = require('./routes/sessionRoutes.js')
const chat = require('./routes/chatRoutes.js')
// const group = require('./routes/groupRoutes.js')
const result = require('./response.js')

const router = express.Router()

router.use('/session', session)
router.use('/chat', chat)
// router.use('/group', group.groupRoutes)

router.all('*', (req, res) => {
    result(res, 404, false, 'The requested url cannot be found.')
})

module.exports = router
