const mysql = require('mysql')
const connection = mysql.createConnection({
  host: "localhost",
  user: "root1",
  password: "",
  database : "bamazon"
})

connection.connect()

module.exports = connection;