var utils = require("./../model/utils/utils");
var validation = require("./../model/utils/validation");
var parser = require("../model/builders/parser"); 


function findIfKeyWordsExistsCV(req,res){ 

   if (!req.body) return res.sendStatus(400);

   if (validation.CVParser(req)) {

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

   } else {
        utils.sendErrorValidation(res);
   }


};


function findIfKeyWordsExistsJOB(req,res){ 

   if (!req.body) return res.sendStatus(400);

   if (validation.JOBParser(req)) {

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

   } else {
        utils.sendErrorValidation(res);
   }

};

exports.findIfKeyWordsExistsJOB = findIfKeyWordsExistsJOB;
exports.findIfKeyWordsExistsCV = findIfKeyWordsExistsCV;

