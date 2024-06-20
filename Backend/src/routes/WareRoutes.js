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
router.post('/signup_comprador', clientesController.createC_gestor);
router.post('/login', clientesController.login);

// Rotas de loja acessíveis aos compradores
router.get('/shop/c_gestor/:categoria', isAuthenticated, isBuyer, comprasController.listCategoriesOrSoftwares);
router.get('/shop/', isAuthenticated, isBuyer, comprasController.listCategoriesOrSoftwares);
router.get('/shop/:idproduto/', isAuthenticated, isBuyer, comprasController.softwareDetails);
router.get('/shop/:idvenda/confirm', isAuthenticated, isBuyer, comprasController.confirmOrder);
router.get('/shop/:idvenda/success', isAuthenticated, isBuyer, comprasController.purchaseSuccess);

// Rotas de biblioteca acessíveis aos compradores e gestores
router.get('/library', isAuthenticated, appController.listAcquiredSoftwares);
router.get('/license', isAuthenticated, licencaController.getSoftwareLicenses);
router.post('/license', isAuthenticated, licencaController.distributeLicense);
router.delete('/license', isAuthenticated, licencaController.removeLicense);
router.post('/license', isAuthenticated, licencaController.sendTicket);
router.get('/license', isAuthenticated, appController.listAddons);

// Rotas do administrador
router.get('/list/tickets', isAuthenticated, isAdmin, ticketController.listTickets);
router.put('/update/tickets/:idticket', isAuthenticated, isAdmin, ticketController.updateTicketStatus);
router.get('/list/admin', isAuthenticated, isAdmin, appController.listSoftwares);
router.put('/update/admin/:idproduto', isAuthenticated, isAdmin, appController.updateSoftware);
router.delete('/edit/admin/:idproduto', isAuthenticated, isAdmin, appController.deleteSoftware);
router.post('/add/admin', isAuthenticated, isAdmin, appController.addSoftware);
router.get('/budget/admin', isAuthenticated, isAdmin, appController.listBudgets);
router.get('/budget/admin/:idorca', isAuthenticated, isAdmin, appController.getBudgetDetails);
router.post('/budget/admin/:idorca', isAuthenticated, isAdmin, appController.respondToBudget);
router.get('/metrics/admin', isAuthenticated, isAdmin, analyticsController.getMetrics);

module.exports = router;
