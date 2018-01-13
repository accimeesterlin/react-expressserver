const mysql = require('mysql')
const connection = mysql.createConnection({
  host: "localhost",
  user: "root1",
  password: "",
  database : "Bamazon"
})

connection.connect()

module.exports = connection;