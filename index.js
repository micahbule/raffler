const fs = require('fs');
const path = require('path');

console.clear();
console.log('Raffler v1.0');
setTimeout(initiate, 10000);

// Thanks MDN
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function initiate() {
    fs.readFile(path.join(__dirname, 'names.txt'), { encoding: 'utf8' }, (err, nameString) => {
        if (err) return console.log(err);
    
        const names = nameString.split('\n');
        let from = 0;
        let to = 0;
        let timerSpeed = 800;
        let timerDuration = names.length * timerSpeed;
        let timer = 0;
        let tmpSwitcher = null;
    
        console.clear();
        console.log('Entries:', names.length);
        
        names.forEach((name, index) => {
            setTimeout(() => {
                console.log(`${index + 1}. ${name}`)
            }, (index + 1) * timerSpeed);
        });
    
        for (let i = 0; i <= 101; i++) {
            do {
                from = getRandomIntInclusive(0, names.length - 1);
                to = getRandomIntInclusive(0, names.length - 1);
            } while (from === to);
    
            tmpSwitcher = names[to];
            names[to] = names[from];
            names[from] = tmpSwitcher;
        }
    
        setTimeout(() => {
            console.clear();
            console.log('Randomized:', names.length);
            
            names.forEach((name, index) => {
                setTimeout(() => {
                    console.log(`${index + 1}. ${name}`)
                }, (index + 1) * timerSpeed);
            });
        }, timerDuration + 2000);
    
        setTimeout(() => {
            const winnerIndex = getRandomIntInclusive(0, names.length - 1);
        
            console.clear();
            console.log(`The winner is ${names[winnerIndex]}! Gratz!`);
        }, (timerDuration * 2) + 4000);
    });
}