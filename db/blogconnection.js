//creo una costante dove salvare mysql2
const mysql = require('mysql2')

//creo una costante per creare le connessione
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
})

connection.connect(err => {
    if (err) throw err
    console.log('Connected to MySQL!');
})

module.exports = connection