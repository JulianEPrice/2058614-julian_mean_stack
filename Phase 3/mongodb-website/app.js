let mongoose = require("mongoose");
let express = require("express");
const bodyParser = require("body-parser");
let url = "mongodb://localhost:27017/tcsmean";
let app = express();

mongoose.pluralize(null);
mongoose.connect(url).then(res=>console.log("connected")).catch(err=>console.log(err))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let db = mongoose.connection;
db.once("open",()=> {
    let courseSchema = mongoose.Schema({
        _id: Number,
        courseName: String,
        description: String,
        amount: Number
    });
    let courseModel = mongoose.model("Courses", courseSchema);
    
app.get("/",(req, res)=>{
    res.sendFile(__dirname+"\\index.html");
})

app.get("/add_course.html", (req, res) => {
    res.sendFile(__dirname+"\\add_course.html");
    console.log(__dirname);
})

app.get("/update_course.html", (req, res) => {
    res.sendFile(__dirname+"\\update_course.html");
})

app.get("/delete_course.html", (req, res) => {
    res.sendFile(__dirname+"\\delete_course.html");
})

app.get("/fetch_course.html", (req, res) => {
    res.write("<table border='1'><tr><th>Course ID</th><th>Course Name</th><th>Description</th><th>Amount</th></tr>");
    courseModel.find({},(error,result)=> {
    if(!error){
        result.forEach(rec=> {
            res.write("<tr><td>" + rec._id + "</td><td>" + rec.courseName + "</td><td>" + rec.description + "</td><td>$" + rec.amount + "</tr>");
        })
    } else {
        console.log(err);
    }
    res.end("</table>");
    })
})

app.post("/add_course", (request, res) => {
    let data = request.body;
    let courseDataToInsert = new courseModel(data);
    res.sendFile(__dirname+"\\add_course.html");
        courseModel.insertMany([courseDataToInsert], (error,result) => {
            if(!error) {
                console.log(result);
            } else {
                console.log(error);
            }
        });
})

app.post("/update_course", (request, res) => {
    let courseID = request.body._id;
    let amount = request.body.amount;
    res.sendFile(__dirname+"\\update_course.html");
    console.log(JSON.stringify(request.body._id));
    courseModel.updateOne({_id:courseID}, {$set:{amount}},(error, result) => {
        if(!error) {
            console.log(result);
        } else {
            console.log(error);
        }
    })
})

app.post("/delete_course", (request, res) => {
    let courseID = request.body._id;
    res.sendFile(__dirname+"\\delete_course.html");
    courseModel.deleteOne({_id:courseID},(error,result)=> {
        if(!error) {
            if(result.deletedCount > 0) {
                console.log("Record deleted successfully");
            } else {
                console.log("Record not present");
            }
        } else {
        console.log(error)
        }
    })
})

})

app.listen(9090,()=>console.log("Server running on port number 9090"));