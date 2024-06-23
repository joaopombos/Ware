import React, { useState } from 'react';
import './budgetadmin.css'; // Import the separated CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

const Orcamentos = () => {
  // Estado para controlar quais items estão expandidos
  const [expandedItems, setExpandedItems] = useState({});

  // Função para alternar a expansão de um item
  const toggleExpand = (id) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const budgetItems = [
    { id: 572, status: 'new', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' },
    { id: 577, status: 'new', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' },
    { id: 467, status: 'responded', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' },
    { id: 894, status: 'responded', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' },
    { id: 356, status: 'responded', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' },
    { id: 257, status: 'responded', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' },
    { id: 197, status: 'responded', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...' }
  ];

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
            {budgetItems.map(item => (
              <div 
                key={item.id} 
                className={`budget-item ${item.status} ${expandedItems[item.id] ? 'expanded' : ''}`} 
                onClick={() => toggleExpand(item.id)}
              >
                <div className="details">
                  <strong>Orçamento #{item.id} - {item.status === 'new' ? 'Novo' : 'Respondido'}</strong>
                  {expandedItems[item.id] && (
                    <div className="extra-details">
                      <p>{item.text}</p>
                      <button className="btn btn-success respond-button">
                        {item.status === 'new' ? 'Responder' : 'Ver Resposta'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orcamentos;
