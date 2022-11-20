const path = require("path");
const express = require("express");
const app = express(); // create express app
const dotenv = require('dotenv');
dotenv.config();

// add middlewares
app.use(express.static("build"));
app.use(express.static("public"));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// start express server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});