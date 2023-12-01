const fs = require('fs');

let initialData;
const number = ["un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"]
// Use fs.readFile() method to read the file 
fs.readFile('./data.txt', 'utf8', function(err, data){ 
    initialData = data.split(/\r?\n|\r|\n/g);

    let totalValue = 0;
    initialData.forEach((lineOfdata, index) => {
        let lineValue = ""
        let isFinish = false;
        for (let index = 0; index < lineOfdata.length; index++) {
            const character = lineOfdata[index]
            if (Number.isInteger(Number(character)) && isFinish === false) {
                lineValue += character;
                isFinish = true;
            }
        }
        isFinish = false;
        for (let index = lineOfdata.length - 1; index >= 0; index--) {
            const character = lineOfdata[index]
            if (Number.isInteger(Number(character)) && isFinish === false) {
                lineValue += character;
                isFinish = true;
                
            }
        }
        totalValue += Number(lineValue)
    });

    console.log(totalValue)
});