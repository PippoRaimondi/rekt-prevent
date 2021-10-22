const db = require('../queries')

exports.createToken = async function (req, res) {
  const { name, chain, initialPrice } = request.body

  db.pool.query('INSERT INTO token (token_desc, chain, initial_price) VALUES ($1, $2, $3)', [name, chain, initialPrice], (error, results) => {
    if (error) {
      throw error
    }

    response.status(201).send(`Token added with ID: ${result.insertId}`)
  })
}
