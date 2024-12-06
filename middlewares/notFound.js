//creo la costante notFound per l'errore 404
const notFound = (req, res, next)=>{
    res.status(404).send('Non è possibile trovare la risorsa');
};

//esporto notFound
module.exports = notFound