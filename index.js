// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
    res.json(getDateObject(new Date()));
});

app.get('/api/:date', (req, res) => {
    let dateParam = req.params.date.trim();
    let date, dateObj;
    if(dateParam.length === 0) dateObj = getDateObject(new Date());
    if(dateParam.includes('-') || dateParam.includes(' '))
        date = new Date(dateParam);
    else
        date = new Date(Number(dateParam));
    
    if (date.valueOf().toString() === 'NaN') {
        dateObj = {error: date.toString()};
    }
    else dateObj = getDateObject(date);

    res.json(dateObj);
});

function getDateObject(date) {
    return {
        unix: date.valueOf(),
        utc: date.toUTCString()
    };
}

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
