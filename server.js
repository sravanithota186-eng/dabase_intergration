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


// Q1 - Students Table
db.run(`
CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentName TEXT,
    registerNumber TEXT
)
`);


// Q2 - Mutation Table
db.run(`
CREATE TABLE IF NOT EXISTS mutation(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    geneName TEXT,
    mutationType TEXT
)
`);


// Q3 - Protein Table
db.run(`
CREATE TABLE IF NOT EXISTS protein(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    proteinName TEXT,
    proteinFunction TEXT
)
`);


// Q4 - Genes Table
db.run(`
CREATE TABLE IF NOT EXISTS genes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    geneName TEXT,
    sequence TEXT
)
`);


// ==================== Q1 ====================

// Add Student
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


// ==================== Q2 ====================

// Add Mutation
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


// ==================== Q3 ====================

// Add Protein
app.post("/add-protein", (req, res) => {

    const { proteinName, proteinFunction } = req.body;

    db.run(
        "INSERT INTO protein(proteinName, proteinFunction) VALUES (?, ?)",
        [proteinName, proteinFunction],
        (err) => {

            if (err) {
                return res.send("Error");
            }

            res.send("Protein Added Successfully");
        }
    );
});


// ==================== Q4 ====================

// Add Gene
app.post("/add-gene", (req, res) => {

    const { geneName, sequence } = req.body;

    db.run(
        "INSERT INTO genes(geneName, sequence) VALUES (?, ?)",
        [geneName, sequence],
        (err) => {

            if (err) {
                return res.send("Error");
            }

            res.send("Gene Added Successfully");
        }
    );
});


// Fetch All Genes
app.get("/genes", (req, res) => {

    db.all(
        "SELECT * FROM genes",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);
        }
    );
});


// Server Start
app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});