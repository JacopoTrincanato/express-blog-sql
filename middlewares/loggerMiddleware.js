//creo la costante loggerMiddleware e ci salvo una funzione
const loggerMiddleware = (req, res, next)=>{
    const now = new Date().toString();
    console.error(`
        Date: ${now}
        Method: ${req.method}
        URL: ${req.url}
    `);
    
    //richiama la funzione next
    next();
};

//esporto loggerMiddleware
module.exports = loggerMiddleware