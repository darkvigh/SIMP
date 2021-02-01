const obj = {}
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
fs.readFile('./Json/login.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        
         let obj = JSON.parse(data); //now it an object
        rl.question("Would you like to login or register?", (choice) => {
            if (choice.toLowerCase() == "login") {
                login(obj)
            } else {
                if (choice.toLowerCase() == "register") {
                    register(obj)
                }
            }
		})

       /* obj[uName] = {}      
        obj[uName].password = "9785"*/

        //writetofile(obj)
        


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
async function register(obj) {

    rl.question("Enter your desired username ", (usr) => {
        let uName = usr.toString()
        if (obj[uName.toLowerCase()]) {
            console.log("Username Taken!")
            register(obj)
        }
        else {
            rl.question("Please insert a password ", (pss) => {
                let pass = pss.toString()
                obj[uName] = {}
                obj[uName].money = 1500
                obj[uName].password = pass
                writetofile(obj);
			})
		}              
	})
}
//------------------------
//login______________________
function login(obj) {
    rl.question(`Please insert your [Username] `, (usr) => {
        let uName = usr.toString()
        if (obj[uName.toLowerCase()]) {
            rl.question("Please insert your password ", (pss) => {

                if (pss == obj[uName].password) {
                    console.log("Welcome!")
                    pg()
                } else {
                    console.log("incorrent")
				}
            })

        } else {
            rl.question(` [${usr}] not found, [retry] or go to [register]? `, (choice) => {
                if (choice.toLowerCase() == "register") {
                    register(obj)
                } else {
                   login(obj)
				}
            })
		}

	})
}