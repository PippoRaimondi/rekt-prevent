"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
// Load environment variables
(0, dotenv_1.config)();
var server_1 = require("../../server");
var port = process.env.PORT || 3000;
server_1["default"].listen(port, function () {
    // eslint-disable-next-line no-console
    console.log("Server started at http://localhost:" + port);
});
