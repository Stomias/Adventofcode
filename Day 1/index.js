const fs = require('fs');

let initialData;
const numbers = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9}
 
fs.readFile('./data.txt', 'utf8', function(err, data){ 
    initialData = data.split(/\r?\n|\r|\n/g);

    let totalValue = 0;
    initialData.forEach((lineOfdata, index) => {
        let lineValue = ""
        let pattern = new RegExp(/one|two|three|four|five|six|seven|eight|nine|[0-9]/, 'g')
        pattern.test(lineOfdata)
        const firstValueIndex = lineOfdata.search(pattern);
        const firstValueLastIndex = pattern.lastIndex
        
        pattern = new RegExp(/one|two|three|four|five|six|seven|eight|nine|[0-9]/, 'g')
        const [lastValueIndex, lastValueLastIndex] = regexLastIndexOf(lineOfdata, pattern)
        
        if (Number.isInteger(Number(lineOfdata[firstValueIndex]))) {
            lineValue += lineOfdata[firstValueIndex]
        } else {
            lineValue += String(numbers[lineOfdata.substring(firstValueIndex, firstValueLastIndex)])
        }
        
        if (Number.isInteger(Number(lineOfdata[lastValueIndex]))) {
            lineValue += lineOfdata[lastValueIndex]
        } else {
            lineValue += String(numbers[lineOfdata.substring(lastValueIndex, lastValueLastIndex)])
        }

        if (Number.isNaN(Number(lineValue))) {
            console.log(index)
        }
        totalValue += Number(lineValue);
    });

    console.log(totalValue)
});

function regexLastIndexOf(string, regex, startpos) {
    regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
    if(typeof (startpos) == "undefined") {
        startpos = string.length;
    } else if(startpos < 0) {
        startpos = 0;
    }
    var stringToWorkWith = string.substring(0, startpos + 1);
    var lastIndexOf = -1;
    var lastIndexOfEnd = -1;
    var nextStop = 0;
    var result;
    while((result = regex.exec(stringToWorkWith)) != null) {
        lastIndexOf = result.index;
        lastIndexOfEnd = result.index + result[0].length
        regex.lastIndex = ++nextStop;
    }
    return [ lastIndexOf, lastIndexOfEnd ];
}