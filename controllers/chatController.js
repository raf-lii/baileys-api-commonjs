const whatsapp = require('./../whatsapp.js')
const result = require('./../response.js')

const getList = (req, res) => {
    return result(res, 200, true, '', whatsapp.getChatList(res.locals.sessionId))
}

const send = async (req, res) => {
    const session = whatsapp.getSession(res.locals.sessionId)
    const receiver = whatsapp.formatPhone(req.body.receiver)
    const { message } = req.body

    try {
        const exists = await whatsapp.isExists(session, receiver)

        if (!exists) {
            return result(res, 400, false, 'The receiver number is not exists.')
        }

        await whatsapp.sendMessage(session, receiver, { text: message })

        result(res, 200, true, 'The message has been successfully sent.')
    } catch {
        result(res, 500, false, 'Failed to send the message.')
    }
}

const sendImage = async (req, res) => {
    const session = whatsapp.getSession(res.locals.sessionId)
    const receiver = whatsapp.formatPhone(req.body.receiver)  

    try {
        const exists = await whatsapp.isExists(session, receiver)

        if (!exists) {
            return result(res, 400, false, 'The receiver number is not exists.')
        }  
        
        await whatsapp.sendMedia(session, receiver)

        result(res, 200, true, 'The message has been successfully sent.')        
    } catch {
        result(res, 500, false, 'Failed to send the message.')
    }
}

const sendBulk = async (req, res) => {
    const session = whatsapp.getSession(res.locals.sessionId)
    const errors = []

    for (const [key, data] of req.body.entries()) {
        if (!data.receiver || !data.message) {
            errors.push(key)

            continue
        }

        data.receiver = whatsapp.formatPhone(data.receiver)

        try {
            const exists = await whatsapp.isExists(session, data.receiver)

            if (!exists) {
                errors.push(key)

                continue
            }

            await whatsapp.sendMessage(session, data.receiver, { text: data.message })
        } catch {
            errors.push(key)
        }
    }

    if (errors.length === 0) {
        return result(res, 200, true, 'All messages has been successfully sent.')
    }

    const isAllFailed = errors.length === req.body.length

    result(
        res,
        isAllFailed ? 500 : 200,
        !isAllFailed,
        isAllFailed ? 'Failed to send all messages.' : 'Some messages has been successfully sent.',
        { errors }
    )
}

module.exports = { getList, send, sendBulk, sendImage }
