let http = require("http");
let url = require("url");
let records = [
    {"user":"Raj","taskID":"123"},
    {"user":"Ramesh","taskID":"567"},
    {"user":"Raju","taskID":"1100"},
]
let indexPage = `
            <html>
                    <head>

                    </head>
                    <body>
                    <h2>Welcome to Http Module</h2>
                    <a href="Login">Task Manager</a>
                    </body>
            </html>
`
let nodeTaskManagerPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node Task Manager</title>
</head>
<body>
    <h2>Task Manager Page</h2>
    <form action="checkTaskID">
        <label>UserName</label>
        <input type="text" name="user"/><br/>
        <label>Password</label>
        <input type="password" name="pass"/><br/>
        <input type="submit" value="submit"/>
       <input type="reset" value="reset"/> <br/>
       <a href="signup">Sign Up</a>
    </form>
</body>
</html> 
`

let registerLoginPage=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node Task Manager</title>
</head>
<body>
    <h2>Registration Page</h2>
    <form action="register">
        <label>Employee ID</label>
        <input type="number" name="employee_id"/><br/>
        <label>Task ID</label>
        <input type="number" name="task_id"/><br/>
        <label>Task</label>
        <input type="text" name="task"/><br/>
        <label>Deadline</label>
        <input type="text" name="deadline"/><br/>

        <input type="submit" value="submit"/>
       <input type="reset" value="reset"/> 
    </form>
</body>
</html>
`
let server = http.createServer((request,response)=> {
    let urlInfo = url.parse(request.url,true);
    if(urlInfo.path != "/favicon.ico"){
        if(urlInfo.path == "/Login"){
            response.write(nodeTaskManagerPage);
        } else if(urlInfo.pathname == "/checkTaskID"){
                let login = urlInfo.query;
                let input = urlInfo.query;
                let result = records.find(l => l.taskID);
                if(result != undefined){
                        response.write("Successful Data Entry!" + result.taskID);
                } else {
                        response.write("Failure try once again!");
                }
        } else if(urlInfo.path =="/signup"){
                response.write(registerLoginPage);
        } else if(urlInfo.pathname == "/register"){
                let input = urlInfo.query;
                let result = records.find(l => l.taskID == input.taskID);
                // 200 -success code , content type in header text/html
                response.writeHead(200,{"content-type":"text/html"});
                if(result == undefined){
                    records.push(input);    // added user and pass in loginDetails
                    response.write("Account Created successfully!");     
                    response.write(nodeTaskManagerPage);
                    } else {
                        response.write("Task ID must be unique!");     
                        response.write(nodeTaskManagerPage); 
                }
        } else {
            response.write(indexPage);  
        }
    }
    
    response.end();

})

function createRecord() {
    let record = {
        employeeID: id
    };
    records.push(record);
    console.log("Pushed records.");
}


server.listen(9090,()=>console.log("Server running on port number 9090"))