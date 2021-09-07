let http = require("http");
let fs = require("fs");
let url = require("url");
let records = [];
let indexPage = `
            <html>
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Node Task Manager</title>
                </head>
                    <body>
                    <h2>Task Manager</h2>
                        <p>Task ID must be unique. If task ID is the same, it will remove the task from the records.</p>
                        <form action="task_manager_form">
                        <label>Employee ID</label>
                        <input type="number" name="employee_id"/><br/>
                        <label>Task ID</label>
                        <input type="number" name="task_id"/><br/>
                        <label>Task</label>
                        <input type="text" name="task"/><br/>
                        <label>Deadline</label>
                        <input type="text" name="deadline"/><br/>
                
                        <input type="submit" value="Add or Delete Task"/>
                    <input type="reset" value="reset"/> 
                </form>
`

let table = `<br>
<table border="1">
    <tr>
        <th>Employee ID</th>
        <th>Task ID</th>
        <th>Task</th>
        <th>Deadline</th>
    </tr>`;
let endOfIndexPage = `</table></body></html>`

let server = http.createServer((request,response) => {
    fs.writeFile("record.json", "", function() {
    });
    let urlInfo = url.parse(request.url,true);
    if (urlInfo.path != "/favicon.ico") {

        let input = urlInfo.query;
        
        let result = records.find(r=>r.task_id == input.task_id);
        if (result == undefined && input.task_id != undefined) { 
            response.writeHead(200,{"content-type":"text/html"});
            records.push(input);
            fs.writeFileSync("record.json", JSON.stringify(records), (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Data appended to file.")
                }
            });
        } else if (result != undefined && input.task_id != undefined) {
            console.log("here");
            let index = records.indexOf(result.task_id);
            records.splice(index, 1);
            fs.writeFileSync("record.json", JSON.stringify(records), (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Data appended to file.")
                }
            });
        }

        fs.readFile("record.json", (error, data) => {
            if (!error) {
                if (data != "") {
                let empString = data.toString();
                let empJSON = JSON.parse(empString);
                table = `<br>
                <table border="1">
                    <tr>
                        <th>Employee ID</th>
                        <th>Task ID</th>
                        <th>Task</th>
                        <th>Deadline</th>
                    </tr>`;
                empJSON.forEach(item => {
                    table += `
                        <tr>
                            <td>${item.employee_id}</td>
                            <td>${item.task_id}</td>
                            <td>${item.task}</td>
                            <td>${item.deadline}</td>
                        </tr>
                        `
                });
                console.log(empJSON);
            }
        }
        response.end(indexPage + table + endOfIndexPage);
        })
    }

})

server.listen(9090,()=>console.log("Server running on port number 9090"))

/*
Run with node record-log.js.
*/