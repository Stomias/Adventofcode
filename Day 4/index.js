const fs = require('fs');

fs.readFile('./data.txt', 'utf8', function(err, data){
    let numberOfCards = 0
    const cards = data.split(/\r?\n|\r|\n/g).map((data) => {
        data = data.replace(/  /g, " ");
        data = data.split(": ")
        data[1] = data[1].split(" | ")
        data[1][0] = data[1][0].split((' '))
        data[1][1] = data[1][1].split((' '))
        data.numberOfCards = 1
        return data
    });
    cards.forEach((card, indexOfCard) => {
        let numberFound = []
        card[1][1].forEach(number => {
            if (card[1][0].includes(number) && !numberFound.includes(number)) {
                numberFound.push(number)
            }
        })
        numberOfCards += card.numberOfCards
        for (let index = indexOfCard + 1; index <= indexOfCard + numberFound.length; index++) {
            cards[index].numberOfCards += card.numberOfCards;
        }
    })

    console.log(numberOfCards)
})