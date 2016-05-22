
/* Common */

function fieldValidation(field) {
    return !!(typeof field !== 'undefined' && field != null );
}

/* Input types validations */

function validateYear(year) {
    return /^\d{4}$/.test(year)
}

/* Private functions for builders */

function expereinceValidation(expereince) {

    var valid = expereince
        && expereince.constructor === Array;

     if (valid) {
        for (var i = 0; i < expereince.length; i++) {
            valid = fieldValidation(expereince[i].text) 
                 && fieldValidation(expereince[i].startdate) && validateYear(expereince[i].startdate)
                 && fieldValidation(expereince[i].enddate) && validateYear(expereince[i].enddate);
            if (!valid) {
                return false;
            }
        }
        return valid;
    }
    else return false;
}

function wordsValidation(words) {

    var valid = words
        && words.constructor === Array;

     if (valid) {
        for (var i = 0; i < words.length; i++) {
            valid = fieldValidation(words[i]);
            if (!valid) {
                return false;
            }
        }
        return valid;
    }
    else return false;
}

function textValidation(text) {
        
     var valid = fieldValidation(text);
        if (!valid) {
            return false;
        }
        return valid;
}


///////////////////////////////// *** Builders Functions *** ///////////////////////////

function CVParser(req) {

    var cvParser = req.body;

    if (cvParser
        && expereinceValidation(cvParser.expereince)
        && wordsValidation(cvParser.words)
    ) { 
        return true; 
    } else {
        return false;
    }
}


function JOBParser(req) {

    var jobParser = req.body;

    if (jobParser
        && textValidation(jobParser.text)
        && wordsValidation(jobParser.words)
    ) { 
        return true; 
    } else {
        return false;
    }
}

///////////////////////////////////// *** EXPORTS *** /////////////////////////////////

exports.CVParser = CVParser; 
exports.JOBParser = JOBParser; 




