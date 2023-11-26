const { Router } = require('express');
const usersRouter = Router();


const {
    getCustomers,
    getCustomersDB,
    getCustomer,
    createCustomer,
    deleteCustomer,
    updateCustomer
} = require('../controllers/usersController');

//get all customers
usersRouter.get('/' , getCustomers);
//get all customers from DB
usersRouter.get('/DB', getCustomersDB);
//get one customer
usersRouter.get('/:id', getCustomer);
//create a customer
usersRouter.post('/', createCustomer);
//delete a customer
usersRouter.delete('/:id', deleteCustomer);
//update a customer
usersRouter.put('/:id', updateCustomer);

module.exports = usersRouter;