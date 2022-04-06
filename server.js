const dotenv = require("dotenv").config();
const express = require("express");
const moment = require("moment");
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
    const time = moment();
    res.json({
        unix: time.unix() * 1000,
        utc: new Date(time).toUTCString()
    });
});

app.get("/api/:date?", (req, res) => {
    let date = req.params.date;

    if (moment(date, "YYYY-MM-DD").isValid() || moment(parseInt(date)).isValid()) {
        if (!moment(date, "YYYY-MM-DD").isValid()) {
            date = parseInt(date);
        }

        return res.status(200).json({
            unix: moment(date).unix() * 1000,
            utc: new Date(date).toUTCString()
        });

    } else {
        return res.status(400).json({ error: "Invalid Date" })
    }
});


// listen for request
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`App listening at http://localhost:${PORT}`);
});