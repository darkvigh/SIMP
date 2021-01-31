module.exports = () => {
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


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

            const rannum = Math.floor((Math.random() * 2) + 1); //flip decide start       
            let result
            if (rannum == 1) {
                result = "heads";
            } else
                if (rannum == 2) {
                result = "tails";
            };        //flip decide end

            flip();

            function flip() { //question start               
                rl.question("Pick a side![", (side) => {
                    if (side.toLowerCase() == "heads" || side.toLowerCase() == "tails") {

                        rl.question("Pick amount to bet{", (bet) => {

                            if (bet.includes("-")) {
                                console.log("***DONT EVEN THINK ABOUT IT!***")
                                rl.close();
                            } else { 
                            if (bet <= obj.a) {
                                if (side.toLowerCase() == result) {
                                    console.log(`Congrats! you picked ${side} and won ${bet}`);

                                    let final = Math.floor((bet * 1) + (obj.a * 1));
                                    obj.a = final
                                    writetofile(obj);

                                    return rl.close()
                                } else

                                    if (side.toLowerCase() !== result) {
                                        console.log(`Sorry you picked "${side}" but the coin landed on "${result}" so you lost ${bet}`);
                                        let final = Math.floor((obj.a * 1) - (bet * 1));
                                        obj.a = final
                                        writetofile(obj);
                                        return rl.close()

                                    }
                            }
                            else if (bet => obj.a) {
                                console.log("sorry wrong amount");
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
