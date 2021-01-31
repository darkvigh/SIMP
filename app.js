const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const flipFile = require('./games/flip.js');
const rouletteGame = require('./games/roulette.js');
pickGame()

function pickGame() {

    rl.question("Pick a game! [Flip] [Roulette] {", (game) => {

        if (game.toLowerCase() == "flip") {
            flipFile();
        } else {
            if (game.toLowerCase() == "roulette") {
                rouletteGame();
            } else {
                console.log("Please pick a valid game!");
                pickGame();
            }
        }

    })
}



