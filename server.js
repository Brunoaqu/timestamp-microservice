const dotenv = require("dotenv").config();
const express = require("express");
const app = express();


// * https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// * http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// * http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// * API ROUTES
app.get("/api/", (req, res) => {
    const time = new Date();
    res.status(200).json({
        unix: new Date(time).getTime(),
        utc: new Date(time).toUTCString()
    });
});

app.get("/api/:date?", (req, res) => {
    let date_string = req.params.date;

    if (isNaN(new Date(date_string))) {
        if (isNaN(new Date(parseInt(date_string)))) {
            return res.status(400).json({ error: "Invalid Date" })
        } else {
            date_string = parseInt(date_string);
        }
    }

    return res.status(200).json({
        unix: new Date(date_string).getTime(),
        utc: new Date(date_string).toUTCString()
    });
});


// listen for request
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`App listening at http://localhost:${PORT}`);
});