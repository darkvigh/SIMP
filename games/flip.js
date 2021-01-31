module.exports = (fs, rl) => {
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

            flip();

            function flip() { //question start               
                rl.question(`[$${obj.a}] [Heads] or [Tails] `, (side) => {
                    if (side.toLowerCase() == "heads" || side.toLowerCase() == "tails") {

                        let rannum = Math.floor((Math.random() * 2) + 1); //flip decide start       
                        let result
                        if (rannum == 1) {
                            result = "heads";
                        } else
                            if (rannum == 2) {
                                result = "tails";
                            };        //flip decide end

                        rl.question(`You currently have [${obj.a}], How much would you like to bet? `, (bet) => {

                            if (bet.includes("-")) {
                                console.log("***DONT EVEN THINK ABOUT IT!***")
                                rl.close();
                            } else {
                                if (bet <= obj.a) {
                                    if (side.toLowerCase() == result) {
                                        console.log("_______________________________________________________________________________________________________________________")
                                        console.log(`Congrats! you picked [${side}] and won [${bet}]`);
                                        console.log("_______________________________________________________________________________________________________________________")

                                        let final = Math.floor((bet * 1) + (obj.a * 1));
                                        obj.a = final
                                        writetofile(obj);

                                        rl.question(`[${obj.a}] Play again? [Y] [N] `, (y) => {
                                            if (y.toLowerCase() == "y") {
                                                flip()
                                            } else {
                                                if (y.toLowerCase() == "n") {
                                                    console.log("Bye Bye!");
                                                    rl.close();
                                                }
                                            }
                                        })

                                        

                                    } else

                                        if (side.toLowerCase() !== result) {
                                            console.log("_______________________________________________________________________________________________________________________")
                                            console.log(`Sorry you picked [${side}] but the coin landed on [${result}] so you lost [${bet}]`);
                                            console.log("_______________________________________________________________________________________________________________________")
                                            let final = Math.floor((obj.a * 1) - (bet * 1));
                                            obj.a = final
                                            writetofile(obj);

                                            rl.question(`[${obj.a}] Would you like to try again? [Y] [N] `, (y) => {
                                                if (y.toLowerCase() == "y") {
                                                    flip()
                                                } else {
                                                    if (y.toLowerCase() == "n") {
                                                        console.log("Bye Bye!");
                                                        rl.close();
                                                    }
                                                }
                                            })

                                        }
                                }
                                else if (bet => obj.a) {
                                    console.log("***INSUFFICIENT FUNDS***");
                                    flip();
                                }

                            }
                        })

                    } else
                        if (side.toLowerCase != side.toLowerCase("heads" || "tails")) {
                            console.log("please pick a valid side");
                            flip();
                        }
                })
            }

        }
    })
}
