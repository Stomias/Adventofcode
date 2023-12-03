const fs = require('fs');

fs.readFile('./data.txt', 'utf8', function(err, data){
    const initialData = data.split(/\r?\n|\r|\n/g)

    sumOfAll = 0;
    initialData.forEach((line, index) => {
        const regex = new RegExp(/[0-9]+/, "g")
        while ((match = regex.exec(line)) != null) {
            if (isThereNeighborAroundNumber(initialData, index, match.index, match.index + match[0].length - 1)) {
                sumOfAll += Number(match[0])
            }
        }
    })
    console.log(sumOfAll)
})

const isThereNeighborAroundNumber = (initialData, rowIndex, charIndexBegin, charIndexEnd) => {
    let hasCharacter
    for (let index = charIndexBegin; index <= charIndexEnd; index++) {
        hasCharacter = getNeighbors(initialData, rowIndex, index)
        if (hasCharacter) {
            return hasCharacter
        }
    }
    return hasCharacter
}

function getNeighbors(schematic, row, col) {
    for (let iRow = row - 1; iRow <= row + 1; iRow++) {
      for (let iCol = col - 1; iCol <= col + 1; iCol++) {
        if (iRow >= 0 && iRow < schematic.length && iCol >= 0 && iCol < schematic[iRow].length) {
          if (schematic[iRow][iCol].match(/[^0-9.]/)) {
            return true
          }
        }
      }
    }
    return false;
  }

const findCharacterAround = (initialData, indexOfLine, indexOfCharacter) => {
    // Ligne au dessus
    if (indexOfLine > 0) {
        // top left
        if (indexOfCharacter > 0 && Number.isInteger(Number(initialData[indexOfLine - 1][indexOfCharacter - 1]))) {
            console.log("top left")
        }
        // top middle
        if (Number.isInteger(Number(initialData[indexOfLine - 1][indexOfCharacter]))) {
            console.log("top middle")
        }
        // top right
        if (Number.isInteger(Number(initialData[indexOfLine - 1][indexOfCharacter + 1]))) {
            console.log("top right")
        }
    }
    // Ligne au milieu
        // left
        if (indexOfCharacter > 0 && Number.isInteger(Number(initialData[indexOfLine][indexOfCharacter - 1]))) {
            console.log("left")
        }
        // right
        if (indexOfCharacter < initialData.length - 1 &&indexOfCharacter < initialData.length - 1 &&Number.isInteger(Number(initialData[indexOfLine][indexOfCharacter + 1]))) {
            console.log("right")
        }

    // Ligne du bas
    if (indexOfLine < initialData.length - 1) {
        // bottom left
        if (indexOfCharacter > 0 && Number.isInteger(Number(initialData[indexOfLine - 1][indexOfCharacter - 1]))) {
            console.log("bottom left")
        }
        // bottom middle
        if (Number.isInteger(Number(initialData[indexOfLine - 1][indexOfCharacter]))) {
            console.log("bottom middle")
        }
        // bottom right
        if (indexOfCharacter < initialData.length - 1 && Number.isInteger(Number(initialData[indexOfLine - 1][indexOfCharacter + 1]))) {
            console.log("bottom right")
        }
    }
}