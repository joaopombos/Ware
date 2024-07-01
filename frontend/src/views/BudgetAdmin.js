import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './budgetadmin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Orcamentos = ({ token }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [budgetItems, setBudgetItems] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/budget/admin', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });

        console.log("Dados de orçamento recuperados com sucesso:", response.data);
        setBudgetItems(response.data);

      } catch (error) {
        console.error('Erro ao buscar os orçamentos:', error);

        if (error.response) {
          console.error('Detalhes do erro de resposta:', error.response.data);
        } else if (error.request) {
          console.error('Erro de requisição:', error.request);
        } else {
          console.error('Erro inesperado:', error.message);
        }
      }
    };

    fetchBudgets();
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleRespond = async (id) => {
    const resposta = prompt("Digite sua resposta:");
    if (resposta) {
      try {
        const response = await axios.post(`http://localhost:3000/budget/respond/${id}`, { resposta }, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });

        alert('Resposta enviada com sucesso!');
        // Atualiza o estado local de budgetItems para refletir a resposta enviada
        const updatedBudgetItems = budgetItems.map(item =>
          item.id === id ? { ...item, resposta } : item
        );
        setBudgetItems(updatedBudgetItems);

      } catch (error) {
        console.error('Erro ao enviar a resposta:', error);
        if (error.response) {
          console.error('Detalhes do erro:', error.response.data);
        } else {
          console.error('Erro de rede:', error.message);
        }
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div id="sidebar" className="col-md-3">
          <div className="logo">
            <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
          </div>
          <ul className="list-unstyled components">
            <li>
              <a href="/add/admin"><i className="fas fa-plus"></i> Adicionar Software</a>
            </li>
            <li>
              <a href="/list/admin"><i className="fas fa-list"></i> Listar Software</a>
            </li>
            <li className="active">
              <a href="/budget/admin"><i className="fas fa-file-invoice-dollar"></i> Orçamentos</a>
            </li>
            <li>
              <a href="/metrics/admin/"><i className="fas fa-chart-line"></i> Métricas de vendas</a>
            </li>
          </ul>
          <div className="logout-button">
            <a href="/" className="btn btn-primary">Terminar Sessão</a>
          </div>
        </div>

        <div id="content" className="col-md-9">
          <h2>Orçamentos</h2>
          <div className="budget-container">
            {budgetItems.length === 0 ? (
              <p>Não há orçamentos disponíveis.</p>
            ) : (
              budgetItems.map(item => (
                <div 
                  key={item.id} 
                  className={`budget-item ${expandedItems[item.id] ? 'expanded' : ''}`} 
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="details">
                    <strong>Orçamento #{item.id}</strong>
                    {expandedItems[item.id] && (
                      <div className="extra-details">
                        <p>{item.text}</p>
                        <h5>Detalhes do Orçamento:</h5>
                        <ul>
                          <li>NIF: {item.nif}</li>
                          <li>ID Produto: {item.idproduto}</li>
                          <li>Estado: {item.estado}</li>
                          <li>Quantidade: {item.quantidade}</li>
                          <li>Preço do Orçamento: ${item.precoorcamento}</li>
                        </ul>
                        <button className="btn btn-success respond-button" onClick={() => handleRespond(item.id)}>
                          Responder
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orcamentos;


