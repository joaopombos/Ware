// ListarSoftwares.js

import React from 'react';
import './listadmin.css'; // Import the separated CSS file

const ListarSoftwares = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div id="sidebar" className="col-md-3">
          <div className="logo">
            <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
          </div>
          <ul className="list-unstyled components">
            <li>
              <a href="/tickets/admin"><i className="fas fa-ticket-alt"></i> Tickets</a>
            </li>
            <li>
              <a href="/edit/admin"><i className="fas fa-edit"></i> Atualizar/Editar Software</a>
            </li>
            <li>
              <a href="/add/admin"><i className="fas fa-plus"></i> Adicionar Software</a>
            </li>
            <li className="active">
              <a href="/list/admin"><i className="fas fa-list"></i> Listar Software</a>
            </li>
            <li>
              <a href="/budget/admin"><i className="fas fa-file-invoice-dollar"></i> Orçamentos</a>
            </li>
            <li>
              <a href="/metrics/admin/"><i className="fas fa-chart-line"></i> Métricas de vendas</a>
            </li>
          </ul>
          <div className="logout-button">
          <a href="/home" className="btn btn-primary">Terminar Sessão</a>
          </div>
        </div>

        <div id="content" className="col-md-9">
          <h2>Listar Softwares</h2>
          <table className="software-list-table">
            <thead>
              <tr>
                <th>Softwares</th>
                <th>Classificação</th>
                <th>Gestão</th>
                <th>Última Atualização</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src="frontend/public/images/software-icons/adobe-photoshop.png" alt="Adobe Photoshop" /> Adobe Photoshop</td>
                <td>4.3</td>
                <td className="actions">
                  <a href="#">Editar</a>
                  <a href="#">Eliminar</a>
                  <a href="#">Ver</a>
                </td>
                <td>08/03/2024 às 09:27</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListarSoftwares;
