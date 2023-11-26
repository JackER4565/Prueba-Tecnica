const { Router } = require('express');
const chargesRouter = Router();

const {
    createCharge,
    getChargesDB,
} = require('../controllers/chargesController');

//create sotre charge
chargesRouter.post('/:id', createCharge);

//get all charges from DB
chargesRouter.get('/', getChargesDB);


module.exports = chargesRouter;