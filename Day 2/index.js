const fs = require('fs');

fs.readFile('./data.txt', 'utf8', function(err, data){ 
    const games = data.split(/\r?\n|\r|\n/g).map((data) => {
        data = data.replace(/Game [0-9]+: |lue|ed|reen| /g, "").split(";")
        data = data.map(line => line.split(','))
        
        return data
    });

    let sumOfAllMinimum = 0
    games.forEach((game, index) => {
        let isPossible = true
        let minRed = 0
        let minGreen = 0
        let minBlue = 0
        game.forEach((part, indexBis) => {
            part.forEach((numberOfCubeAndColor, lastIndex) => {
                const letter = numberOfCubeAndColor.replace(/r/, ",r").replace(/g/, ",g").replace(/b/, ",b").split(",")
                if (letter[1] === "r" && Number(letter[0]) > minRed) {
                    minRed = Number(letter[0])
                }
                if (letter[1] === "g" && Number(letter[0]) > minGreen) {
                    minGreen = Number(letter[0])
                }
                if (letter[1] === "b" && Number(letter[0]) > minBlue) {
                    minBlue = Number(letter[0])
                }
            })
        })
        sumOfAllMinimum = sumOfAllMinimum +  minRed * minGreen * minBlue
    }); 


    console.log(sumOfAllMinimum)
})