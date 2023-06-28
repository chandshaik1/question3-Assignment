// index.js
const mysql = require('mysql')

const customers = [
  {
    email: 'anurag11@yopmail.com',
    name: 'anurag',
  },
  {
    email: 'sameer11@yopmail.com',
    name: 'sameer',
  },
  {
    email: 'ravi11@yopmail.com',
    name: 'ravi',
  },
  {
    email: 'akash11@yopmail.com',
    name: 'akash',
  },
  {
    email: 'anjali11@yopmail.com',
    name: 'anjai',
  },
  {
    email: 'santosh11@yopmail.com',
    name: 'santosh',
  },
]

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

  // Insert customers into the database
  insertCustomers(customers)
})

// Function to insert customers into the database
function insertCustomers(customers) {
  customers.forEach(customer => {
    const {email, name} = customer

    // Check if the email already exists
    connection.query(
      'SELECT * FROM customers WHERE email = ?',
      [email],
      (err, results) => {
        if (err) throw err

        if (results.length > 0) {
          // Update the name for the existing customer
          connection.query(
            'UPDATE customers SET name = ? WHERE email = ?',
            [name, email],
            err => {
              if (err) throw err
              console.log(`Updated name for ${email}`)
            },
          )
        } else {
          // Insert a new customer
          connection.query(
            'INSERT INTO customers (email, name) VALUES (?, ?)',
            [email, name],
            err => {
              if (err) throw err
              console.log(`Inserted ${email}`)
            },
          )
        }
      },
    )
  })
}

// Close the MySQL connection
connection.end(err => {
  if (err) throw err
  console.log('Disconnected from MySQL database')
})
