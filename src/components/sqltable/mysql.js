// create-table.js

const mysql = require('mysql')

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
})

// Connect to MySQL
connection.connect(err => {
  if (err) throw err
  console.log('Connected to MySQL database')

  // Create the table
  createTable()
})

// Function to create the table
function createTable() {
  const sql = `
    CREATE TABLE customers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL
    )
  `

  connection.query(sql, err => {
    if (err) throw err
    console.log('Table created successfully')
  })
}

// Close the MySQL connection
connection.end(err => {
  if (err) throw err
  console.log('Disconnected from MySQL database')
})
