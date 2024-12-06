//creo la costante express
const express = require('express');

//creo la costante router
const router = express.Router();

//importo il contenuto di dolcicontroller
const dolciController = require('../controllers/dolcicontroller.js');

//definisco le rotte

//index 
router.get('/', dolciController.index);

//show
router.get('/:id', dolciController.show);

//store
router.post('/', dolciController.store);

//update
router.put('/:id', dolciController.update);

//destroy
router.delete('/:id', dolciController.destroy);

//esporto router
module.exports = router