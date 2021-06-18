const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//import routes
const authRoutes = require("./routes/auth")

// app middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }))

//middleware
app.use("/api", authRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Api is running on port ${port}`))