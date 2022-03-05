// import { isSessionExists } from '../whatsapp.js'
const whatsapp = require('./../whatsapp')
// import response from './../response.js'
const result = require('./../response.js')

const validate = (req, res, next) => {
    const sessionId = req.query.id

    if (!whatsapp.isSessionExists(sessionId)) {
        return result(res, 404, false, 'Session not found.')
    }

    res.locals.sessionId = sessionId
    next()
}

module.exports = validate
