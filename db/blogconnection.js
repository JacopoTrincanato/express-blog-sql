//creo una costante dove salvare mysql2
const mysql = require('mysql2')

//creo una costante per creare le connessione
const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    user: 'root',
    database: 'blog_db'
})

connection.connect(err => {
    if (err) throw err
    console.log('Connected to MySQL!');
})

module.exports = connection