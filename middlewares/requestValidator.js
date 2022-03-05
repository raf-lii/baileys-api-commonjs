const { validationResult } = require('express-validator')
const result = require('./../response.js')

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return result(res, 400, false, 'Please fill out all required input.')
    }

    next()
}

module.exports = validate