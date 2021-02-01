const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const flipFile = require('./games/flip.js');
const rouletteGame = require('./games/roulette.js');
const login = require(`./config/login.js`)

login(fs, rl, pg)
function pg(uName) {
    rl.question("Pick a game! [Flip] [Roulette] ", (game) => {

        if (game.toLowerCase() == "flip") {
            flipFile(fs, rl, uName);
        } else {
            if (game.toLowerCase() == "roulette") {
                rouletteGame(fs, rl, uName);
            } else {
                console.log("Please pick a valid game!");
                pg();
            }
        }

    })
}



