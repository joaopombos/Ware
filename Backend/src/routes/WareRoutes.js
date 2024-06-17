const express = require('express');
const router = express.Router();
const warecontrollers = require('../controllers/WareControllers');
const clientesController = require('../controllers/ClientesController');
const comprasController = require('../controllers/ComprasController');


//22 endreços
//router.get('/home');
router.post('/signup_comprador', clientesController.createC_gestor);
router.get('/shop/c_gestor', comprasController.listCategoriesOrSoftwares);
router.get('/shop/', comprasController.listCategoriesOrSoftwares);
router.get('/shop/:idproduto/',comprasController.softwareDetails);
router.get('/shop/:idvenda/confirm', comprasController.confirmOrder);
router.get('/shop/:idvenda/sucess', comprasController.purchaseSuccess);




/*
router.get('/shop', warecontrollers.filme_list);
router.get('/shop/my', warecontrollers.filme_list);
router.get('/shop/:idproduto/', warecontrollers.filme_list);
router.get('/shop/:idvenda/confirm', warecontrollers.filme_list);
router.get('/shop/:idvenda/sucess', warecontrollers.filme_list);
router.get('/tickets/admin', warecontrollers.filme_list);
router.put('/edit/admin', warecontrollers.filme_list);
router.get('/add/admin', warecontrollers.filme_list);
router.get('/list/admin', warecontrollers.filme_list);
router.get('/budget/admin', warecontrollers.filme_list);
router.get('/budget/admin/:idorca', warecontrollers.filme_list);
router.get('/metrics/admin/', warecontrollers.filme_list);
router.post('/login', warecontrollers.filme_list);
router.post('/signin/tipo', warecontrollers.filme_list);
router.get('/signin/gestor', warecontrollers.filme_list);
router.get('/signin/sucess', warecontrollers.filme_list);
router.post('/signin/c_gestor', warecontrollers.filme_list);
router.get('/library', warecontrollers.filme_list);
router.get('/license', warecontrollers.filme_list);
*/
module.exports = router; 