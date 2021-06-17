const express = require("express");
const app = express();

//import routes
const authRoutes = require("./routes/auth")

//middleware
app.use("/api", authRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Api is running on port ${port}`))