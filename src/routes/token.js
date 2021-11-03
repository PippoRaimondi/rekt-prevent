const db = require('../queries')

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

exports.listCoinGeckoTokens = async function (req, res) {
  let response = await CoinGeckoClient.simple.price({
    ids: [
      'verso',
      'sekuritance',
      'ledgerscore',
      'carbon-gems',
      'tokenplace',
      'dctdao',
      'dfund',
      'bcpay-fintech',
      'opulous',
      'buying-com',
      'ydragon',
      'nft-champions',
      'internet-of-energy-network',
    ],
    vs_currencies: 'usd',
  });
  res.send(response.data)
}

exports.getAllTokens = async function (req, res) {
  db.pool.query('SELECT * FROM "Token"', (error, results) => {
    if (error) {
      throw error
    }

    res.status(200).send(results.rows)
  })
}


exports.createToken = async function (req, res) {
  const { name, chain, initialPrice } = req.body

  db.pool.query('INSERT INTO token (token_desc, chain, initial_price) VALUES ($1, $2, $3)', [name, chain, initialPrice], (error, results) => {
    if (error) {
      throw error
    }

    res.status(201).send(`Token added with ID: ${results.insertId}`)
  })
}
