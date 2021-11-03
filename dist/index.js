"use strict";
const express = require('express');
const app = express();
const port = 3000;
const token = require('./routes/token.js');
const portfolio = require('./routes/portfolio.js');
app.get('/allTokens', token.getAllTokens);
app.get('/portfolio', portfolio.getPortfolio);
app.get('/portfoliotokens', portfolio.getPortfolioTokens);
app.listen(port, () => { });
//# sourceMappingURL=index.js.map