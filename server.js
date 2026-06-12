const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));


// Database Connection
const db = new sqlite3.Database("database.db");


// Student Table
db.run(`
CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentName TEXT,
    registerNumber TEXT
)
`);


// Mutation Table
db.run(`
CREATE TABLE IF NOT EXISTS mutation(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    geneName TEXT,
    mutationType TEXT
)
`);


// Q1 Route - Add Student
app.post("/add-student", (req, res) => {

    const { studentName, registerNumber } = req.body;

    db.run(
        "INSERT INTO students(studentName, registerNumber) VALUES (?, ?)",
        [studentName, registerNumber],
        (err) => {

            if (err) {
                return res.send("Error");
            }

            res.send("Student Added Successfully");
        }
    );

});


// Q2 Route - Add Mutation
app.post("/add-mutation", (req, res) => {

    const { geneName, mutationType } = req.body;

    db.run(
        "INSERT INTO mutation(geneName, mutationType) VALUES (?, ?)",
        [geneName, mutationType],
        (err) => {

            if (err) {
                return res.send("Error");
            }

            res.send("Mutation Added Successfully");
        }
    );

});


app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});