import React from 'react';
import './budgetadminorc.css'; // Import the separated CSS file

const Orcamentos = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div id="sidebar" className="col-md-3">
          <div className="logo">
            <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
          </div>
          <ul className="list-unstyled components">
            <li>
              <a href="#"><i className="fas fa-ticket-alt"></i> Tickets</a>
            </li>
            <li>
              <a href="#"><i className="fas fa-edit"></i> Atualizar/Editar Software</a>
            </li>
            <li>
              <a href="#"><i className="fas fa-plus"></i> Adicionar Software</a>
            </li>
            <li>
              <a href="#"><i className="fas fa-list"></i> Listar Software</a>
            </li>
            <li className="active">
              <a href="#"><i className="fas fa-file-invoice-dollar"></i> Orçamentos</a>
            </li>
            <li>
              <a href="#"><i className="fas fa-chart-line"></i> Métricas de vendas</a>
            </li>
          </ul>
          <div className="logout-button">
            <button className="btn btn-primary">Terminar Sessão</button>
          </div>
        </div>

        <div id="content" className="col-md-9">
          <h2>Orçamentos</h2>
          <div className="budget-container">
            <div className="budget-item">
              <h4>Orçamento #345</h4>
              <div className="client-info">
                <p><strong>Nome Cliente:</strong> Nome do Cliente</p>
                <p><strong>Email do Cliente:</strong> email@cliente.com</p>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Software</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Adobe Illustrator</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>Office 365</td>
                    <td>50</td>
                  </tr>
                </tbody>
              </table>
              <div className="response-container">
                <label htmlFor="response">Resposta</label>
                <textarea id="response" className="form-control response-textarea"></textarea>
              </div>
              <button className="btn btn-success respond-button mt-2">Responder</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orcamentos;
