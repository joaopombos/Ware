
import React from 'react';
import './budgetadmin.css'; // Import the separated CSS file

const Orcamentos = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div id="sidebar" className="col-md-3">
          <div className="logo">
            <img src="frontend/public/images/Logos/logotipo copy.svg" alt="Logo" />
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
            <div className="budget-item new">
              <div className="details">
                <strong>Orçamento #572 - Novo</strong>
                <div className="extra-details">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                  <button className="btn btn-success respond-button">Responder</button>
                </div>
              </div>
            </div>
            <div className="budget-item new">
              <div className="details">
                <strong>Orçamento #577 - Novo</strong>
                <div className="extra-details">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                  <button className="btn btn-success respond-button">Responder</button>
                </div>
              </div>
            </div>
            <div className="budget-item responded">
              <div className="details">
                <strong>Orçamento #467 - Respondido</strong>
                <div className="extra-details">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                  <button className="btn btn-success respond-button">Responder</button>
                </div>
              </div>
            </div>
            <div className="budget-item responded">
              <div className="details">
                <strong>Orçamento #894 - Respondido</strong>
                <div className="extra-details">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                  <button className="btn btn-success respond-button">Responder</button>
                </div>
              </div>
            </div>
            <div className="budget-item responded">
              <div className="details">
                <strong>Orçamento #356 - Respondido</strong>
                <div className="extra-details">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                  <button className="btn btn-success respond-button">Responder</button>
                </div>
              </div>
            </div>
            <div className="budget-item responded">
              <div className="details">
                <strong>Orçamento #257 - Respondido</strong>
                <div className="extra-details">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                  <button className="btn btn-success respond-button">Responder</button>
                </div>
              </div>
            </div>
            <div className="budget-item responded">
              <div className="details">
                <strong>Orçamento #197 - Respondido</strong>
                <div className="extra-details">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                  <button className="btn btn-success respond-button">Responder</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orcamentos;
