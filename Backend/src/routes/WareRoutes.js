const express = require('express');
const router = express.Router();
const licencaController = require('../controllers/LicencasController');
const clientesController = require('../controllers/ClientesController');
const comprasController = require('../controllers/ComprasController');
const appController = require('../controllers/AppController');
const ticketController = require('../controllers/TicketController');
const analyticsController = require('../controllers/AnalyticsController');

const { isAuthenticated, isBuyer, isManager, isAdmin } = require('../middlewares/middleware');

// Rotas de cadastro e login
router.post('/signin/comprador', clientesController.createSignup); //VV
router.post('/signin/gestor', clientesController.create_gestor);   //VV
router.post('/login', clientesController.login);                   //VV
router.post('/login/admin', clientesController.loginadmin);        //VV
router.get('/logout', clientesController.logout);                  //V
router.get('/logout/admin', clientesController.logoutadmin);       //V

// Rotas de loja acessíveis aos comprador
router.get('/shop/c_gestor/:categoria', isAuthenticated, isBuyer, comprasController.listCategoriesOrSoftwares);  //Só está a mostrar a categoria devia mostrar mais
router.get('/shop/', isAuthenticated, isBuyer, comprasController.listCategoriesOrSoftwares);                     //Dá só categoria 
router.get('/shop/:idproduto/', isAuthenticated, isBuyer, comprasController.softwareDetails);                    //V
router.get('/shop/:idproduto/', isAuthenticated, appController.compareAndUpdateSoftware);    //NOVO              //Erro
router.get('/shop/:idvenda/confirm', isAuthenticated, isBuyer, comprasController.confirmOrder);                  //Erro             
router.get('/shop/:idvenda/success', isAuthenticated, isBuyer, comprasController.purchaseSuccess);               //Erro

// Rotas de biblioteca acessíveis aos compradores e gestores
router.get('/library', isAuthenticated, appController.listAcquiredSoftwares);               //V
router.get('/license/get', isAuthenticated, licencaController.getSoftwareLicenses);         //Erro
router.post('/license/dist', isAuthenticated, licencaController.distributeLicense);         //ERRo
router.delete('/license/remove', isAuthenticated, licencaController.removeLicense);         //Erro
router.post('/ticket/send', isAuthenticated, licencaController.sendTicket);                 //Erro
router.get('/addons', isAuthenticated, appController.listAddons);                           //Erro
router.get('/upgrade/software', isAuthenticated, appController.compareAndUpdateSoftware);  //Erro 

// Rotas do administrador
router.get('/list/tickets', isAuthenticated, isAdmin, ticketController.listTickets);                       //V
router.put('/update/tickets/:idticket', isAuthenticated, isAdmin, ticketController.updateTicketStatus);   //V
router.get('/list/admin', isAuthenticated, isAdmin, appController.listSoftwares);                        //V
router.put('/update/admin/:idproduto', isAuthenticated, isAdmin, appController.updateSoftware);         //V
router.delete('/edit/admin/:idproduto', isAuthenticated, isAdmin, appController.deleteSoftware);        //V
router.post('/add/admin', isAuthenticated, isAdmin, appController.addSoftware);                         //V
router.get('/budget/admin', isAuthenticated, isAdmin, appController.listBudgets);                       //V
router.get('/budget/admin/:idorca', isAuthenticated, isAdmin, appController.getBudgetDetails);          //V
router.post('/budget/admin/:idorca', isAuthenticated, isAdmin, appController.respondToBudget);          //V 
router.get('/metrics/admin', isAuthenticated, isAdmin, analyticsController.getMetrics);                 //V 

module.exports = router;
