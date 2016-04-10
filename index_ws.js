var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();
var parser = require('./parser');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/findIfKeyWordsExistsCV', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    var searchWordsResults;
    var words = [];
    var years;
    var exists = false;
    var index;
    var word = {
        name: null,
        years: null
    };

    for (var i = 0; i < req.body.expereince.length; i++) {
        parser.addDataToSearch(req.body.expereince[i].text.toLowerCase(), function (dataArray) {
            years = req.body.expereince[i].enddate - req.body.expereince[i].startdate;
            parser.searchWords(req.body.words, dataArray,function (results) {
                    searchWordsResults = results;
                    if (searchWordsResults.matchWords.length > 0) {
                        if (words.length == 0) {
                            for (var i = 0; i < searchWordsResults.matchWords.length; i++) {
                                words.push({
                                    name:searchWordsResults.matchWords[i],
                                    years:years
                                });
                            }
                        } else {
                            for (var i = 0; i < searchWordsResults.matchWords.length; i++) {
                                for (var j = 0; j <words.length; j++) {
                                    if (searchWordsResults.matchWords[i] === words[j].name) {
                                        exists = true;
                                        index = j;
                                        break;
                                    }
                                }
                                if (exists) {
                                    words[index].years += years;
                                } else {
                                    words.push({
                                        name:searchWordsResults.matchWords[i],
                                        years:years
                                    })
                                }
                                exists = false;
                            }
                        }
                    }
            });
        });
    }
    res.json(words);
});



app.post('/findIfKeyWordsExistsJOB', jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    var wordsArray=[];
    var exists = false;

        parser.addDataToSearch(req.body.text.toLowerCase(), function (words) {
            parser.searchWords(req.body.words, words,function (results) {

                console.log(results);

                    searchWordsResults = results;
                            for (var i = 0; i < searchWordsResults.matchWords.length; i++) {
                                wordsArray.push(searchWordsResults.matchWords[i]);
                            }           
            }); 
             
        }); 
res.json(wordsArray);
});


app.get('/', function (req, res) {
    res.send("Welcome to Builders");
});

var port = process.env.PORT || 3000;
app.use('/', express.static('./public')).listen(port);
console.log("listening on port " + port + "\n");






























