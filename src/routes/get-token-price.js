const CoinGecko = require('coingecko-api');
const { TOKENS } = require('../crypto-assets')
const db = require('../queries')

const CoinGeckoClient = new CoinGecko();

exports.listTokens = async function (req, res) {
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
    ],
    vs_currencies: 'usd',
});
  console.log(response)
  res.send(response.data)
}

exports.listAllTokens = async function (req, res) {
  let response = await CoinGeckoClient.coins.all();
  console.log(response)
  res.send(response.data)
}

exports.getAllMonnioToken = async function (req, res) {
  db.pool.query('SELECT * FROM "Token"', (error, results) => {
    if (error) {
      throw error
    }

    res.status(200).send(results.rows)
  })
}
