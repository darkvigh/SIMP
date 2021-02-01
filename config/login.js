module.exports = (fs, rl, pg) => {
    const obj = {}
    
   
    fs.readFile('./Json/login.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {

            let obj = JSON.parse(data); //now it an object
            rl.question("Would you like to login or register?", (choice) => {
                if (choice.toLowerCase() == "login") {
                    login(obj, fs, rl, pg)

                } else {
                    if (choice.toLowerCase() == "register") {
                        register(obj, fs, rl, pg)
                    }
                }
            })

          



        }
    })
    //Function section__________________
    //write to file________
    async function writetofile(towrite) {
        json = JSON.stringify(towrite); //convert it back to json
        fs.writeFile('./Json/login.json', json, 'utf8', (err, callback) => {

            if (err) {
                console.log(err);

            }
        }); // write it back 
        return rl.close()
    }

//----------------------
//register________________
async function register(obj, fs, rl, pg) {

    rl.question("Enter your desired username ", (usr) => {
        let uName = usr.toString()
        if (obj[uName.toLowerCase()]) {
            console.log("Username Taken!")
            register(obj, fs, rl, pg)
        }
        else {
            rl.question("Please insert a password ", (pss) => {
                let pass = pss.toString()
                obj[uName] = {}
                obj[uName].money = 1500
                obj[uName].password = pass
                writetofile(obj, fs, rl, pg);
            })
        }
    })
}
//------------------------
//login______________________
async function login(obj, fs, rl, pg) {
    rl.question(`Please insert your [Username] `, (usr) => {
        const uName = usr.toString()
        if (obj[uName.toLowerCase()]) {
            rl.question("Please insert your password ", (pss) => {

                if (pss == obj[uName].password) {
                    console.log("Welcome!")
                    pg(uName)
                } else {
                    console.log("incorrent")
                }
            })

        } else {
            rl.question(` [${usr}] not found, [retry] or go to [register]? `, (choice) => {
                if (choice.toLowerCase() == "register") {
                    register(obj, fs, rl, pg)
                } else {
                    login(obj, fs, rl, pg)
                }
            })
        }

    })
}
}