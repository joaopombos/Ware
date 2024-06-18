const express = require('express');
const router = express.Router();
const licencaController = require('../controllers/LicencasController');
const clientesController = require('../controllers/ClientesController');
const comprasController = require('../controllers/ComprasController');
const appController = require('../controllers/AppController');
const ticketController = require('../controllers/TicketController');
const analyticsController = require('../controllers/AnalyticsController');


//20 endreços
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
router.get('/library', appController.listAcquiredSoftwares);
router.get('/license', licencaController.getSoftwareLicenses);
router.post('/license',  licencaController.distributeLicense);
router.delete('/license', licencaController.removeLicense);
router.post('/license',  licencaController.sendTicket);
router.post('/login', clientesController.login);

/* router.post('/login', warecontrollers.filme_list);
router.post('/signin/tipo', warecontrollers.filme_list);
router.get('/signin/gestor', warecontrollers.filme_list);
router.get('/signin/sucess', warecontrollers.filme_list);
router.post('/signin/c_gestor', warecontrollers.filme_list);
router.get('/library', warecontrollers.filme_list);
router.get('/license', warecontrollers.filme_list); */

/* Solução das sessões dos utlizaores e bloquear rotas

const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/ClientesController');
const comprasController = require('../controllers/ComprasController');
const appController = require('../controllers/AppController');
const ticketController = require('../controllers/TicketController');
const analyticsController = require('../controllers/AnalyticsController');

// Middlewares
const { isAuthenticated, isBuyer, isManager } = require('../middlewares/auth');

// Rotas

// Rota de cadastro de comprador
router.post('/signup_comprador', clientesController.createC_gestor);

// Rotas de loja acessíveis aos compradores
router.get('/shop/c_gestor/:categoria', isAuthenticated, isBuyer, comprasController.listCategoriesOrSoftwares);
router.get('/shop/', isAuthenticated, isBuyer, comprasController.listCategoriesOrSoftwares);
router.get('/shop/:idproduto/', isAuthenticated, isBuyer, comprasController.softwareDetails);
router.get('/shop/:idvenda/confirm', isAuthenticated, isBuyer, comprasController.confirmOrder);
router.get('/shop/:idvenda/success', isAuthenticated, isBuyer, comprasController.purchaseSuccess);

// Rotas do administrador (gestor)
router.get('/list/tickets', isAuthenticated, isManager, ticketController.listTickets);
router.put('/update/tickets/:idticket', isAuthenticated, isManager, ticketController.updateTicketStatus);
router.get('/list/admin', isAuthenticated, isManager, appController.listSoftwares);
router.put('/update/admin/:idproduto', isAuthenticated, isManager, appController.updateSoftware);
router.delete('/edit/admin/:idproduto', isAuthenticated, isManager, appController.deleteSoftware);
router.post('/add/admin', isAuthenticated, isManager, appController.addSoftware);
router.get('/budget/admin', isAuthenticated, isManager, appController.listBudgets);
router.get('/budget/admin/:idorca', isAuthenticated, isManager, appController.getBudgetDetails);
router.post('/budget/admin/:idorca', isAuthenticated, isManager, appController.respondToBudget);
router.get('/metrics/admin', isAuthenticated, isManager, analyticsController.getMetrics);
*/
module.exports = router;


















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