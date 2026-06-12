const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));


// Connect SQLite Database
const db = new sqlite3.Database("database.db");


// Create Table
db.run(`
CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentName TEXT,
    registerNumber TEXT
)
`);


// POST API
app.post("/add-student", (req, res) => {

    const { studentName, registerNumber } = req.body;

    db.run(
        "INSERT INTO students(studentName, registerNumber) VALUES (?,?)",
        [studentName, registerNumber],
        (err) => {

            if (err) {
                return res.send("Error");
            }

            res.send("Student Added Successfully");
        }
    );
});


app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});