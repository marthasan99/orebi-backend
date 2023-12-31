const express = require("express");
const dbConnection = require("./config/db");
const app = express();

require("dotenv").config();
const routes = require("./routes");

dbConnection();

app.use(express.json());
app.use(routes);

app.listen(8000);
