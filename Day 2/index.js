const fs = require('fs');

const config = {
    red: 12,
    green: 13,
    blue: 14
}

fs.readFile('./data.txt', 'utf8', function(err, data){ 
    const games = data.split(/\r?\n|\r|\n/g).map((data) => {
        data = data.replace(/Game [0-9]+: |lue|ed|reen| /g, "").split(";")
        data = data.map(line => line.split(','))
        
        return data
    });

    let possibleGameIndexesSum = 0
    games.forEach((game, index) => {
        let isPossible = true
        game.forEach((part, indexBis) => {
            part.forEach((numberOfCubeAndColor, lastIndex) => {
                const letter = numberOfCubeAndColor.replace(/r/, ",r").replace(/g/, ",g").replace(/b/, ",b").split(",")
                if (letter[1] === "r" && Number(letter[0]) > config.red) {
                    isPossible = false
                }
                if (letter[1] === "g" && Number(letter[0]) > config.green) {
                    isPossible = false
                }
                if (letter[1] === "b" && Number(letter[0]) > config.blue) {
                    isPossible = false
                }
            })
        })
        if (isPossible) {
            possibleGameIndexesSum += Number(index + 1)
        }
    }); 


    console.log(possibleGameIndexesSum)
})