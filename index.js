var express = require('express');
var app = express();
var option = require('./options.js');
var formation = require('./formationUrl');
var DBquery = require('./functionDB/databaseQuery');
var API = require('./intraAPI/APIQuery.js');


app.use(express.static('frontend'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/frontend/index.html');
});

app.get('/get_users', function(req, res) {
    let query, wave, ord;
    if (req.query.ord != undefined && req.query.wave != undefined) {

        if (req.query.wave != -1)
            wave = 'wave=' + req.query.wave;
        if (req.query.ord == 'down')
            ord = 'ORDER BY level, login DESC';
        else if (req.query.ord == 'up')
            ord = 'ORDER BY level DESC, login';
        if (req.query.wave == -1)
            query = 'SELECT `id`, `login`, `level`, `wave`, `staff`, `datatime` FROM `users` WHERE staff=\'0\' ' + ord + ';'
        else
            query = 'SELECT `id`, `login`, `level`, `wave`, `staff`, `datatime` FROM `users` WHERE staff=\'0\' AND ' + wave + ' ' + ord + ';'
        console.log(query);
       
        DBquery.databaseQuery(function (query) {
            option.connection.query(query, function(err, result) {
                if (err) {
                  return console.error(err.message);
                }
                
                res.send(result);
                option.connection.end(function (err) {
                    // all connections in the pool have ended
                  });
                console.log(option.connection.state);
              });
        }, query);
    }
    else {
        DBquery.databaseQuery(function () {
            option.connection.query('SELECT `id`, `login`, `level`, `wave`, `staff`, `datatime` FROM `users` WHERE staff=0 ORDER BY level DESC;', function(err, result) {
                if (err) {
                  return console.error(err.message);
                }
                res.send(result);
                option.connection.end(function (err) {
                    // all connections in the pool have ended
                  });
                console.log(option.connection.state);
              });
        });
    }
    
});

app.get('/update_users', function(req, res) {
   DBquery.updateUsersTab(function () {
       res.send('1');
   });
});

app.listen(3000);