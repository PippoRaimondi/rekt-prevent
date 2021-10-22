const express = require('express')
const app = express()
const port = 3000

const getTokenPrice = require('./routes/get-token-price.js')
const token = require('./routes/token.js')

app.get('/', getTokenPrice.listTokens)
app.get('/allMonnioTokens', getTokenPrice.getAllMonnioToken)
app.get('/all', getTokenPrice.listAllTokens)

app.post('/createToken', token.createToken)

app.listen(port, () => {})
