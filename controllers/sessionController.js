const whatsapp = require('./../whatsapp')
const result = require('./../response.js')

const find = (req, res) => {
    if (whatsapp.isSessionExists(req.params.id)) {
        return result(res, 200, true, 'Session found.')
    }

    result(res, 404, false, 'Session not found.')
}

const add = (req, res) => {
    const { id, isLegacy } = req.body

    if (whatsapp.isSessionExists(id)) {
        return result(res, 409, false, 'Session already exists, please use another id.')
    }
    whatsapp.createSession(id, isLegacy === 'true', res)
}

const del = async (req, res) => {
    const { id } = req.params
    const session = whatsapp.getSession(id)

    if (session) {
        try {
            await session.logout()
        } catch {
        } finally {
            whatsapp.deleteSession(id, session.isLegacy)
        }
    }

    result(res, 200, true, 'The session has been successfully deleted.')
}

module.exports = { find, add, del }
