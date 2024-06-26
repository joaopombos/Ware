import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/home';
import Signup_comprador from './views/signup_comprador';
import Shop from './views/Shop';
import ShopProd from './views/ShopProd';
import Shopconfirm from './views/Shopconfirm';
import ShopSucess from './views/Shopsucess';
import EditAdmin from './views/EditAdmin';
import AddAdmin from './views/AddAdmin';
import ListAdmin from './views/ListAdmin';
import BudgetAdmin from './views/BudgetAdmin';
import BudgetAdminOrc from './views/BudgetAdminOrc';
import MetricsAdmin from './views/MetricsAdmin';
import Login from './views/Login';
import LoginAdmin from './views/LoginAdmin';
import Sign_tipo from './views/Sign_tipo';
import Sign_gestor from './views/Sign_gestor';
import Sign_Sucess from './views/Sign_sucess';
import Sign_cGestor from './views/Sign_cGestor';
import Library from './views/Library';
import License from './views/License';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup/comprador" element={<Signup_comprador />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:idproduto/" element={<ShopProd />} />
          <Route path="/shop/:idvenda/confirm" element={<Shopconfirm />} />
          <Route path="/shop/:idvenda/sucess" element={<ShopSucess />} />
          <Route path="/edit/admin/:idproduto" element={<EditAdmin />} />
          <Route path="/add/admin" element={<AddAdmin />} />
          <Route path="/list/admin" element={<ListAdmin />} />
          <Route path="/budget/admin" element={<BudgetAdmin />} />
          <Route path="/budget/admin/:idorca" element={<BudgetAdminOrc />} />
          <Route path="/metrics/admin/" element={<MetricsAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/signin/tipo" element={<Sign_tipo />} />
          <Route path="/signin/gestor" element={<Sign_gestor />} />
          <Route path="/signin/sucess" element={<Sign_Sucess />} />
          <Route path="/signin/c_gestor" element={<Sign_cGestor />} />
          <Route path="/library" element={<Library />} />
          <Route path="/license/:chaveproduto" element={<License />} />
        </Routes>
    </Router>
  );
}

export default App;