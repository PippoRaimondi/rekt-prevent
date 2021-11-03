const db = require('../queries')

const getPortfolioQuery = 'SELECT * FROM portfolio where user_id = $1'
const getPortfolioTokensQuery = 'SELECT TOK.id, TOK.token_desc, TOK.initial_price FROM \
                                "Token" AS TOK INNER JOIN portfoliotoken AS POT \
                                ON TOK.id = POT.token_id WHERE POT.portfolio_id = $1'

exports.getPortfolio = async function (req, res) {
  const { userid } = req.query

  db.pool.query(getPortfolioQuery, [userid], (error, results) => {
    if (error) {
      throw error
    }

    res.status(200).send(results.rows)
  })
}

exports.getPortfolioTokens = async function (req, res) {
  const { portfolioid } = req.query

  db.pool.query(getPortfolioTokensQuery, [portfolioid], (error, results) => {
    if (error) {
      throw error
    }

    res.status(200).send(results.rows)
  })
}
