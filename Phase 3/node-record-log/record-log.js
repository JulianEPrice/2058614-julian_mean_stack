let fs = require("fs");
let readline = require("readline-sync");

let id = readline.questionInt("Enter the ID: ");
let firstName = readline.question("Enter your first name: ");
let lastName = readline.question("Enter your last name: ");
let gender = readline.question("Enter your gender: ");
let email = readline.questionEMail("Enter email: ");
let dateAndTime = new Date().toString();
debugger;
console.log("Read user input.");

let records = [];

fs.readFile("record.json", (err,data) => {
    if(!err) {
        let recordString = data.toString();
        console.log(recordString);
        if (recordString != "") {
            records = JSON.parse(recordString);
        }
        createRecord();

        fs.writeFile("record.json", JSON.stringify(records), (error) => {
            if (error) {
                console.log(error);   
            } else {
                console.log("Data appended to file.")
            }
        });
    }
});

function createRecord() {
    let record = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        dateAndTime: dateAndTime
    };
    records.push(record);
    debugger;
    console.log("Pushed records.");
    debugger;
}

/*
Run the program using "node record-log.js"
To debug run "node --inspect record-log.js"
*/