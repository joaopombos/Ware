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
router.get('/shop/c_gestor/:categoria', comprasController.listCategoriesOrSoftwares); 
router.get('/shop/', comprasController.listCategoriesOrSoftwares);
router.get('/shop/:idproduto/',comprasController.softwareDetails); //Feito
router.get('/shop/:idvenda/confirm', comprasController.confirmOrder);
router.get('/shop/:idvenda/sucess', comprasController.purchaseSuccess);

//router.get('/admin');
router.get('/list/tickets', ticketController.listTickets);  //Feito - Falta criar ticket - Nome do Software ou idproduto       
router.put('/update/tickets/:idticket', ticketController.updateTicketStatus);   //Feito  - Falta Criar Ticket - Nome Software ou Idproduto  
router.get('/list/admin', appController.listSoftwares);             // Feito
router.put('/update/admin/:idproduto', appController.updateSoftware);   //Feito
router.delete('/edit/admin/:idproduto', appController.deleteSoftware);   //Feito
router.post('/add/admin', appController.addSoftware);          //Feito - Talvez meter idproduto autoIncrement?
router.get('/budget/admin', appController.listBudgets);           //Feito Falta criar Orçamento 
router.get('/budget/admin/:idorca', appController.getBudgetDetails);  //Feito Falta criar Orçamento  
router.post('/budget/admin/:idorca', appController.respondToBudget);  //Feito Falta criar Orçamento 
router.get('/metrics/admin', analyticsController.getMetrics); //Feito - Tive que simplificar e retirar as datas porque nao temos na tabela orç




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