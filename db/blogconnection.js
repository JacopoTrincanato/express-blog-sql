//creo una costante dove salvare mysql2
const mysql = require('mysql2')

//creo una costante per creare le connessione
const connection = mysql.createConnection({
    host: process.env.HOS,
    port: process.env.PORT,
    user: '',
    database: 'blog_db'
})

module.exports = connection