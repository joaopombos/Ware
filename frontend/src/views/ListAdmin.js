import React, { useState } from 'react';
import axios from 'axios';  // Importar o axios corretamente
import { useNavigate } from 'react-router-dom';  // Importar o useNavigate para redirecionamento
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './listadmin.css';


export default function EditComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Instanciar o useNavigate para redirecionamento

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login/admin', { username, password }, {
        withCredentials: true // Se necessário
      });
      const { token } = response.data;
      console.log('Login successful', token);

      // Armazenar o token no localStorage
      localStorage.setItem('token', token);

      // Redirecionar para a página desejada após o login
      navigate('/tickets/admin');
    } catch (error) {
      console.error('Login error', error);
      if (error.response && error.response.data) {
        setError(error.response.data.error || 'An unexpected error occurred');
      } else if (error.message === 'Network Error') {
        setError('Erro de rede. Verifique sua conexão ou tente novamente mais tarde.');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };


  return (
    <div class="body-container">
      <div id="sidebar">
        <div class="logo">
          <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
        </div>
        <ul class="components">
          <li>
            <a href="/tickets/admin"><i class="fas fa-ticket-alt"></i> Tickets</a>
          </li>
          <li>
            <a href="/edit/admin"><i class="fas fa-edit"></i> Atualizar/Editar Software</a>
          </li>
          <li>
            <a href="/add/admin"><i class="fas fa-plus"></i> Adicionar Software</a>
          </li>
          <li class="active">
            <a href=""><i class="fas fa-list"></i> Listar Software</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-file-invoice-dollar"></i> Orçamentos</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-chart-line"></i> Métricas de vendas</a>
          </li>
        </ul>
        <div class="logout-button">
        <a href="/home" class="btn btn-primary">Terminar Sessão</a>
        </div>
      </div>

      <div id="content">
    <h2 style={{marginbottom: '3%'}}>Listar Softwares</h2>
    <table class="software-list-table">
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
          <td><img src="frontend/public/images/software-icons/adobe-photoshop.png" alt="Adobe Photoshop"/> Adobe Photoshop</td>
          <td>4.3</td>
          <td class="actions">
            <a href="#">Editar</a>
            <a href="#">Eliminar</a>
            <a href="#">Ver</a>
          </td>
          <td>08/03/2024 às 09:27</td>
        </tr>
      </tbody>
    </table>
  </div>
      
    </div>
  );
}



