import React, { useState } from 'react';
import './budgetadmin.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Orcamentos = () => {
  const [expandedItems, setExpandedItems] = useState({});

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
    <div class="container-fluid">
      <div class="row">
        <div id="sidebar" class="col-md-3">
          <div class="logo">
            <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
          </div>
          <ul class="list-unstyled components">
            <li>
              <a href="/tickets/admin"><i class="fas fa-ticket-alt"></i> Tickets</a>
            </li>
            <li>
              <a href="/edit/admin"><i class="fas fa-edit"></i> Atualizar/Editar Software</a>
            </li>
            <li>
              <a href="/add/admin"><i class="fas fa-plus"></i> Adicionar Software</a>
            </li>
            <li>
              <a href="/list/admin"><i class="fas fa-list"></i> Listar Software</a>
            </li>
            <li class="active">
              <a href="/budget/admin"><i class="fas fa-file-invoice-dollar"></i> Orçamentos</a>
            </li>
            <li>
              <a href="/metrics/admin/"><i class="fas fa-chart-line"></i> Métricas de vendas</a>
            </li>
          </ul>
          <div class="logout-button">
          <a href="/home" class="btn btn-primary">Terminar Sessão</a>
          </div>
        </div>

        <div id="content" class="col-md-9">
          <h2>Orçamentos</h2>
          <div class="budget-container">
            {budgetItems.map(item => (
              <div 
                key={item.id} 
                class={`budget-item ${item.status} ${expandedItems[item.id] ? 'expanded' : ''}`} 
                onClick={() => toggleExpand(item.id)}
              >
                <div class="details">
                  <strong>Orçamento #{item.id} - {item.status === 'new' ? 'Novo' : 'Respondido'}</strong>
                  {expandedItems[item.id] && (
                    <div class="extra-details">
                      <p>{item.text}</p>
                      <button class="btn btn-success respond-button">
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
