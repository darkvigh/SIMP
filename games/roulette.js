module.exports = () => {
    const fs = require("fs");
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const rannum = Math.floor((Math.random() * 4) + 1);
    const a = ['yellow', 'red', 'black', 'white']
    let result = a[rannum]
    //let b = a.replace(",", " ");
    


    function writetofile(towrite) {
        json = JSON.stringify(towrite); //convert it back to json
        fs.writeFile('./Currency.json', json, 'utf8', (err, callback) => {

            if (err) {
                console.log(err);
            }
        }); // write it back 
    }
    fs.readFile('./Currency.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            roulette();



            function roulette() {
                rl.question(`Please choose a colour between Yellow, Red, Black, White,`, (choice) => {
                    if (choice.toLowerCase() == "yellow" || choice.toLowerCase() == "red" || choice.toLowerCase() == "black" || choice.toLowerCase() == "white") {
                        rl.question(`You currently have $${obj.a} how much would you like to bet?`, (bet) => {
                            if (bet.includes("-")) {
                                console.log("***DONT EVEN THINK ABOUT IT!***")
                                rl.close();
                            } else { 
                            if (bet <= obj.a) {
                                if (choice.toLowerCase() == result) {
                                    let final = Math.floor((bet * 1) + (obj.a * 1));
                                    obj.a = final
                                    writetofile(obj);
                                    console.log("_______________________________________________________________________________________________________________________")
                                    console.log(`Congrats!, You bet on ${result} with $${bet} And won! Your current balance is $${obj.a}`);
                                    console.log("_______________________________________________________________________________________________________________________")
                                    rl.question(`Do you want to play again? "Y"? "N"?`, (y) => {
                                        if (y.toLowerCase() == "y") {
                                            roulette()
                                        } else {
                                            if (y.toLowerCase() == "n") {
                                                console.log("Bye Bye!");
                                                rl.close();
                                            }
                                        }
                                    })
                                }
                                if (choice.toLowerCase() !== result) {
                                    let final = Math.floor((obj.a * 1) - (bet * 1));
                                    obj.a = final
                                    writetofile(obj);
                                    console.log("_______________________________________________________________________________________________________________________")
                                    console.log(`Too bad!, You bet on ${choice} With $${bet} And lost! Your current balance is $${obj.a}`);
                                    console.log("_______________________________________________________________________________________________________________________")
                                    rl.question(`Do you want to try again? "Y"? "N"?`, (y) => {
                                        if (y.toLowerCase() == "y") {
                                            roulette()
                                        } else {
                                            if (y.toLowerCase() == "n") {
                                                console.log("Bye Bye!");
                                                rl.close();
                                            }
                                        }

                                    })
                                }
                            } else {
                                if (bet => obj.a) {
                                    console.log("_______________________________________________________________________________________________________________________")
                                    console.log(`*INSUFFICIENT FUNDS!* You Have $${obj.a}, You Need $${bet}. `)
                                    console.log("_______________________________________________________________________________________________________________________")
                                    rl.question(`Would you like to return? "Y"? "N"?`, (y) => {
                                        if (y.toLowerCase() == "y") {
                                            roulette()
                                        }
                                        else {
                                            console.log("Bye Bye!");
                                            rl.close();
                                        }
                                    })

                                }
                            }
                        }
							})				                               
                    } else {
                console.log(`"${choice}" Is not a valid colour`);
            }
        
                });
            }
        }
        });
        };
    