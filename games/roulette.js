module.exports = (fs, rl, uName) => {
      
    


    function writetofile(towrite) {
        json = JSON.stringify(towrite); //convert it back to json
        fs.writeFile('./Json/login.json', json, 'utf8', (err, callback) => {

            if (err) {
                console.log(err);
            }
        }); // write it back 
    }
    fs.readFile('./Json/login.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            
            roulette(uName);


            

            function roulette(uName) {
                let rannum = Math.floor((Math.random() * 4) + 1);
                const a = ['yellow', 'red', 'black', 'white']
                let result = a[rannum]
                rl.question(`[${obj[uName].money}] Please choose a colour between [Yellow] [Red] [Black] [White] `, (choice) => {
                    if (choice.toLowerCase() == "yellow" || choice.toLowerCase() == "red" || choice.toLowerCase() == "black" || choice.toLowerCase() == "white") {
                        rl.question(`You currently have [$${obj[uName].money}] how much would you like to bet? `, (bet) => {
                            if (bet.includes("-")) {
                                console.log("***DONT EVEN THINK ABOUT IT!***")
                                rl.close();
                            } else { 
                            if (bet <= obj[uName].money) {
                                if (choice.toLowerCase() == result) {
                                    let final = Math.floor((bet * 1) + (obj[uName].money * 1));
                                    obj[uName].money = final
                                    writetofile(obj);
                                    console.log("_______________________________________________________________________________________________________________________")
                                    console.log(`Congrats!, You bet on [${result}] with [$${bet}] And won! Your current balance is [$${obj[uName].money}] `);
                                    console.log("_______________________________________________________________________________________________________________________")
                                    rl.question(`Would you like to play again? [Y] [N] `, (y) => {
                                        if (y.toLowerCase() == "y") {
                                            roulette(uName)
                                        } else {
                                            if (y.toLowerCase() == "n") {
                                                console.log("Bye Bye!");
                                                rl.close();
                                            }
                                        }
                                    })
                                }
                                if (choice.toLowerCase() !== result) {
                                    let final = Math.floor((obj[uName].money * 1) - (bet * 1));
                                    obj[uName].money = final
                                    
                                    writetofile(obj);
                                    console.log("_______________________________________________________________________________________________________________________")
                                    console.log(`[${result}] Too bad!, You bet on [${choice}] With [$${bet}] And lost! Your current balance is [$${obj[uName].money}]`);
                                    console.log("_______________________________________________________________________________________________________________________")
                                    rl.question(`Would you like to try again? [Y] [N] `, (y) => {
                                        if (y.toLowerCase() == "y") {
                                            roulette(uName)
                                        } else {
                                            if (y.toLowerCase() == "n") {
                                                console.log("Bye Bye!");
                                                rl.close();
                                            }
                                        }

                                    })
                                }
                            } else {
                                if (bet => obj[uName].money) {
                                    console.log("_______________________________________________________________________________________________________________________")
                                    console.log(`*INSUFFICIENT FUNDS!* You Have [$${obj[uName].money}], You Need [$${bet}]. `)
                                    console.log("_______________________________________________________________________________________________________________________")
                                    rl.question(`Would you like to return? [Y] [N] `, (y) => {
                                        if (y.toLowerCase() == "y") {
                                            roulette(uName)
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
                console.log(`[${choice}] Is not a valid colour`);
            }
        
                });
            }
        }
        });
        };
    