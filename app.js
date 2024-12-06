//creo una variabile che richiama express
const express = require('express');

//creo una variabile che richiama cors
const cors = require('cors');

//creo la costante app
const app = express();

//importo il contenuto di posts.js
const postRouter = require('./routers/posts.js');

//importo notFound middleware
const notFound = require('./middlewares/notFound.js');

//importo loggerMiddleware
const loggerMiddleware = require('./middlewares/loggerMiddleware.js');

//richiamo la variabile d'ambiente HOST dal file .env
const HOST = process.env.HOST;

//richiamo la variabile d'ambiente PORT dal file .env
const PORT = process.env.PORT;

//gestisco i file statici
app.use(express.static('public'));

// Uso cors per permettere richieste da tutti gli origin
app.use(cors());

//starto il server
app.listen(PORT, (req, res) => {
    console.log(`Server is running at ${HOST}:${PORT}`);

});

//creo la prima rotta
app.get('/', (req, res) => {
    res.send('Post rest API');
})

//inserisco il middleware
app.use(express.json());

//Post API
app.use('/posts', postRouter);

//uso il middleware notFound
//app.use('/posts', notFound);

//uso il middleware loggerMiddleware
app.use('/posts', loggerMiddleware);

//creo un nuovo errore
app.use('/posts', (req, res, next) => {
    //gestione errori lato server
    throw new Error('Errore interno');

});

//gestisco l'errore 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        status: 500,
        message: 'error message',
        error: err.message
    });
});

