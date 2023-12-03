const fs = require('fs');

fs.readFile('./data.txt', 'utf8', function(err, data){
    const initialData = data.split(/\r?\n|\r|\n/g)

    sumOfAll = 0;
    initialData.forEach((line, index) => {
        const regex = new RegExp(/[\*]+/, "g")
        while ((match = regex.exec(line)) != null) {
            const allNumbers = getNumbers(initialData, index, match.index)
            if (allNumbers.length > 0) {
                sumOfAll += allNumbers[0] * allNumbers[1]
            }
        }
    })
    console.log(sumOfAll)
})

function getNumbers(schematic, row, col) {
    let totalMatch = []
    for (let iRow = row - 1; iRow <= row + 1; iRow++) {
        for (let iCol = col - 1; iCol <= col + 1; iCol++) {
          if (iRow >= 0 && iRow < schematic.length && iCol >= 0 && iCol < schematic[iRow].length) {
            if (schematic[iRow][iCol].match(/[0-9]/)) {
              const fullNumber = findFullNumber(schematic, iRow, iCol);
              if (!totalMatch.includes(fullNumber)) {
                totalMatch.push(fullNumber)
              }
            }
          }
        }
      }
      if (totalMatch.length === 2) {
        return totalMatch;
      } else {
        return []
      }
}

function findFullNumber(schematic, row, col) {
    let completeNumber = "";
    // d'abord à gauche
    for (let index = col; index >= col - 2; index--) {
        if (!Number.isNaN(Number(schematic[row][index]))) {
            completeNumber = schematic[row][index] + completeNumber;
        } else {
            break;
        }
    }
    // puis à droite
    for (let index = col + 1; index <= col + 2; index++) {
        if (!Number.isNaN(Number(schematic[row][index]))) {
            completeNumber = completeNumber + schematic[row][index];
        } else {
            break;
        }
    }
    return completeNumber;
}
