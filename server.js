const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//import routes
const authRoutes = require("./routes/auth")

//middleware
app.use("/api", authRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Api is running on port ${port}`))