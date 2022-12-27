const mysql = require("mysql2");

const conn = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"crud_react"
});

conn.connect((err)=>{
    if(err) throw err;
    console.log("Koneksi Database");
});

module.exports = conn;