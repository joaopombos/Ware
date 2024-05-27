const express = require('express');
const router = express.Router();
const warecontrollers = require('../controllers/WareControllers');
const createuser = require('../controllers/ClientesController');
const clientesController = require('../controllers/ClientesController');

//22 endreços
router.get('/home');
router.post('/signup_comprador', clientesController.create);
/*router.get('/shop', warecontrollers.filme_list);
router.get('/shop/my', warecontrollers.filme_list);
router.get('/shop/(id_app)/', warecontrollers.filme_list);
router.get('/shop/(id_venda)/confirm', warecontrollers.filme_list);
router.get('/shop/(id_venda)/sucess', warecontrollers.filme_list);
router.get('/tickets/admin', warecontrollers.filme_list);
router.get('/edit/admin', warecontrollers.filme_list);
router.get('/add/admin', warecontrollers.filme_list);
router.get('/list/admin', warecontrollers.filme_list);
router.get('/budget/admin', warecontrollers.filme_list);
router.get('/budget/admin/(id_orçamento)', warecontrollers.filme_list);
router.get('/metrics/admin/', warecontrollers.filme_list);
router.get('/login', warecontrollers.filme_list);
router.get('/signin/tipo', warecontrollers.filme_list);
router.get('/signin/gestor', warecontrollers.filme_list);
router.get('/signin/sucess', warecontrollers.filme_list);
router.get('/signin/c_gestor', warecontrollers.filme_list);
router.get('/library', warecontrollers.filme_list);
router.get('/license', warecontrollers.filme_list);*/

module.exports = router; 