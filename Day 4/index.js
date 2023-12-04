const fs = require('fs');

fs.readFile('./data.txt', 'utf8', function(err, data){
    let sumOfAllPoints = 0
    const cards = data.split(/\r?\n|\r|\n/g).map((data) => {
        data = data.replace(/  /g, " ").replace(/Card [0-9]+: /g, "").split(" | ")
        data[0] = data[0].split((' '))
        data[1] = data[1].split((' '))
        
        return data
    });
    cards.forEach((card, index) => {
        let actualPoints = 0;
        let numberFound = []
        card[1].forEach(number => {
            if (actualPoints === 0 && card[0].includes(number) && !numberFound.includes(number)) {
                numberFound.push(number)
                actualPoints += 1
            } else if (card[0].includes(number) && !numberFound.includes(number)) {
                numberFound.push(number)
                actualPoints = actualPoints * 2
            }
        })
        sumOfAllPoints += actualPoints
    })
    console.log(sumOfAllPoints)
})