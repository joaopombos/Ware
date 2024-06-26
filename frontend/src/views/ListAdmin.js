import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './listadmin.css';

const ListAdmin = () => {
  const [softwares, setSoftwares] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/list/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setSoftwares(response.data);
      } catch (error) {
        console.error('Error fetching softwares:', error);
        if (error.response && error.response.data) {
          setError(error.response.data.error || 'An unexpected error occurred');
        } else if (error.message === 'Network Error') {
          setError('Erro de rede. Verifique sua conexão ou tente novamente mais tarde.');
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchSoftwares();
  }, []);

  const handleEdit = (idproduto) => {
    navigate(`/edit/admin/${idproduto}`);
  };

  const handleDelete = async (idproduto) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/edit/admin/${idproduto}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setSoftwares(softwares.filter(software => software.idproduto !== idproduto));
    } catch (error) {
      console.error('Error deleting software:', error);
      setError('Erro ao deletar software. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div className="body-container">
      <div id="sidebar">
        <div className="logo">
          <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
        </div>
        <ul className="components">
          <li>
            <a href="/tickets/admin"><i className="fas fa-ticket-alt"></i> Tickets</a>
          </li>
          <li>
            <a href="/add/admin"><i className="fas fa-plus"></i> Adicionar Software</a>
          </li>
          <li className="active">
            <a href=""><i className="fas fa-list"></i> Listar Software</a>
          </li>
          <li>
            <a href="/budget/admin"><i className="fas fa-file-invoice-dollar"></i> Orçamentos</a>
          </li>
          <li>
            <a href="#"><i className="fas fa-chart-line"></i> Métricas de vendas</a>
          </li>
        </ul>
        <div className="logout-button">
          <a href="/home" className="btn btn-primary">Terminar Sessão</a>
        </div>
      </div>

      <div id="content">
        <h2 style={{ marginBottom: '3%' }}>Listar Softwares</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <table className="software-list-table">
          <thead>
            <tr>
              <th>Softwares</th>
              <th>Versão</th>
              <th>Avaliação</th>
              <th>Gestão</th>
            </tr>
          </thead>
          <tbody>
            {softwares.map(software => (
              <tr key={software.idproduto}>
                <td>
                  <img src={`data:image/png;base64,${software.logotipo}`} alt={software.nome} />
                  {software.nome}
                </td>
                <td>{software.versao}</td>
                <td>{software.classificacaoMedia ? software.classificacaoMedia.toFixed(1) : 'N/A'}</td>
                <td className="actions">
                  <button className="btn btn-primary" onClick={() => handleEdit(software.idproduto)} style={{ width: '120px', marginRight: '10px' }}>Editar</button>
                  <button className="btn btn-danger btn-block" onClick={() => handleDelete(software.idproduto)} style={{ width: '120px' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAdmin;
