
exports.addDataToSearch = function(data,callback) {

    var dataArray = data.split(/[" "=:?!*%()@$^&_=-]/);
    callback(dataArray);
}


exports.searchWords = function(words,dataArray,callback) {

    var results=[];
    var indexOfResults=[];

    for (var i = 0; i < words.length; i++) {
        var exist = dataArray.indexOf(words[i]);
        if (exist != -1){
             indexOfResults.push(exist);
             results.push(words[i]);     
        }
    };


    var jsonResults = {
        "matchWords":null
    };

    jsonResults.matchWords = results;
    callback(jsonResults);
}













