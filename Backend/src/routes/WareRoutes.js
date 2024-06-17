const express = require('express');
const router = express.Router();
const warecontrollers = require('../controllers/WareControllers');
const clientesController = require('../controllers/ClientesController');
const comprasController = require('../controllers/ComprasController');
const appController = require('../controllers/AppController');
const ticketController = require('../controllers/TicketController');
const analyticsController = require('../controllers/AnalyticsController');


//22 endreços
//router.get('/home');
router.post('/signup_comprador', clientesController.createC_gestor);  // Feito

//router.get('/shop');
router.get('/shop/c_gestor', comprasController.listCategoriesOrSoftwares); //
router.get('/shop/', comprasController.listCategoriesOrSoftwares);
router.get('/shop/:idproduto/',comprasController.softwareDetails);
router.get('/shop/:idvenda/confirm', comprasController.confirmOrder);
router.get('/shop/:idvenda/sucess', comprasController.purchaseSuccess);

//router.get('/admin');
router.get('/tickets/admin', ticketController.listTickets);
router.put('/tickets/admin', ticketController.updateTicketStatus);
router.get('/list/admin', appController.listSoftwares);
router.put('/update/admin', appController.updateSoftware);
router.delete('/edit/admin', appController.deleteSoftware);
router.post('/add/admin', appController.addSoftware);          //Adicionar Softwares Feito - Talvez meter idproduto autoIncrement?
router.get('/budget/admin', appController.listBudgets);
router.get('/budget/admin/:idorca', appController.getBudgetDetails);
router.post('/budget/admin/:idorca', appController.respondToBudget);
router.get('/metrics/admin', analyticsController.getMetrics);




/*
router.post('/login', warecontrollers.filme_list);
router.post('/signin/tipo', warecontrollers.filme_list);
router.get('/signin/gestor', warecontrollers.filme_list);
router.get('/signin/sucess', warecontrollers.filme_list);
router.post('/signin/c_gestor', warecontrollers.filme_list);
router.get('/library', warecontrollers.filme_list);
router.get('/license', warecontrollers.filme_list);
*/
module.exports = router; 