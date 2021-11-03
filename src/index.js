const express = require('express')
const app = express()
const port = 3000

const getTokenPrice = require('./routes/get-token-price.js')
const portfolio = require('./routes/portfolio.js')


app.get('/allTokens', getTokenPrice.getAllTokens)
app.get('/portfolio', portfolio.getPortfolio)
app.get('/portfoliotokens', portfolio.getPortfolioTokens)

app.listen(port, () => {})
