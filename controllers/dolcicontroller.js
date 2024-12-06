//importo l'array dal file db.js nella cartella db
const posts = require('../db/db.js');

//aggiungo fs
const fs = require('fs');

//importo connection
const connection = require('../db/blogconnection.js');

//ricreo il nuovo index
const index = (req, res) => {

    /*commento il codice
    res.json({
        data: posts,
        count: posts.length
    });*/

    //creo la costante sql
    const sql = 'SELECT * FROM posts'
    //recupero i post dal database
    connection.query(sql, (err, results) => {

        //ritorno un errore se è presente
        if (err) return res.status(500).json({ error: err })

        const responseData = {
            data: results,
            counter: results.length
        }

        res.status(200).json(responseData)
    })
};

//creo show
const show = (req, res) => {

    //uso find per trovare e visualizzare il post in base al suo slug
    const post = posts.find(post => post.slug === req.params.slug)

    //restituisci un messaggio di errore se non trova il post
    if (!post) {
        return res.status(404).json({
            error: `404! Not found`
        });
    }
    //se lo trova, restituisci uno status 200
    return res.status(200).json({
        data: post
    });

};

//creo store
const store = (req, res) => {

    console.log(req.body);
    // console.log(req)


    //creo il nuovo post
    const post = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };

    //pusho il nuovo post nell'array
    posts.push(post);

    fs.writeFileSync('./db/db.js', `const posts = ${JSON.stringify(posts, null, 4)};\n\nmodule.exports = posts;`);

    //fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)

    //ritorno l'array di post aggiornato
    return res.status(201).json({
        status: 201,
        data: posts,
        count: posts.length
    });
};

//creo update
const update = (req, res) => {

    //uso find per trovare e visualizzare il post in base al suo slug
    const post = posts.find(post => post.slug === req.params.slug);

    //restituisci un messaggio di errore se non trova il post
    if (!post) {
        return res.status(404).json({
            error: `404! Not found`
        });
    };

    //aggiorno il post
    post.title = req.body.title;
    post.slug = req.body.slug;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;


    //Aggiorno l'array posts con i nuovi dati
    fs.writeFileSync('./db/db.js', `const posts = ${JSON.stringify(posts, null, 4)};\n\nmodule.exports = posts;`);

    //se lo trova, restituisci uno status 200
    return res.status(200).json({
        status: 201,
        data: posts,
        count: posts.length
    });

};

//creo destroy
const destroy = (req, res) => {

    //creo una costante per l'id
    const id = req.params.id

    //creo un costante sql
    const sql = 'DELETE FROM posts WHERE id = ?'

    //preparo la query per eliminare un post
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err })

        if (results.affectedRows === 0) return res.status(404).json({ error: "Non esiste un post con quell' id" })
    })

    return res.status(204).json({ status: 204 })
    //uso find per trovare e visualizzare il post in base al suo slug
    /*const post = posts.find(post => post.slug === req.params.slug);
    console.log(post);

    //verifico se il post esiste
    if (!post) {
        return res.status(404).json({
            error: `404! not found`
        });
    };

    //cancello il post
    const newPosts = posts.filter(post => post.slug !== req.params.slug);

    //aggiorno l'array posts con i nuovi dati
    fs.writeFileSync('./db/db.js', `const posts = ${JSON.stringify(newPosts, null, 4)};\n\nmodule.exports = posts;`);

    //restituisco il nuovo array con i dati salvati
    res.status(200).json({
        status: 201,
        data: newPosts,
        count: newPosts.length
    });*/
};

//esporto index, show, store, update e destroy
module.exports = {
    index,
    show,
    store,
    update,
    destroy
}