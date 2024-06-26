import React, { useState } from 'react';
import axios from 'axios';
import './editadmin.css'; // Import CSS file for styling

const SoftwareUpdate = () => {
  const [idproduto, setIdProduto] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [versao, setVersao] = useState('');
  const [precoproduto, setPrecoProduto] = useState('');
  const [logotipo, setLogotipo] = useState(null);
  const [imagenssoftware, setImagensSoftware] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      // Criação de um objeto FormData para enviar os dados
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('descricao', descricao);
      formData.append('categoria', categoria);
      formData.append('versao', versao);
      formData.append('precoproduto', precoproduto);
      if (logotipo) formData.append('logotipo', logotipo);
      if (imagenssoftware) formData.append('imagenssoftware', imagenssoftware);

      console.log('Dados do software a serem enviados:');
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      console.log('Token de Autorização:', token);

      console.log('Enviando requisição para atualizar software...');
      const response = await axios.put(`http://localhost:3000/update/admin/${idproduto}`, formData, config);

      console.log('Resposta do servidor:', response.data);
      // Lógica de tratamento da resposta
      window.alert('Software atualizado com sucesso!');

      // Limpar campos após sucesso (opcional)
      setIdProduto('');
      setNome('');
      setDescricao('');
      setCategoria('');
      setVersao('');
      setPrecoProduto('');
      setLogotipo(null);
      setImagensSoftware(null);

    } catch (error) {
      console.error('Erro ao atualizar software:', error);
      // Tratamento de erro
      if (error.response) {
        console.error('Erro de resposta:', error.response.data);
        setError(error.response.data.error); // Define o erro para exibição na interface
        window.alert(`Erro ao atualizar software: ${error.response.data.error}`);
      } else if (error.request) {
        console.error('Erro de requisição:', error.request);
        window.alert('Erro ao atualizar software: Erro de requisição.');
      } else {
        console.error('Erro geral:', error.message);
        window.alert(`Erro ao atualizar software: ${error.message}`);
      }
    }
  };

  // Verificar se o usuário está autenticado (exemplo simples)
  const isLoggedIn = localStorage.getItem('token') !== null;

  if (!isLoggedIn) {
    return <div>Você precisa iniciar sessão para acessar esta página.</div>;
  }

  return (
    <div className="wrapper">
      <div className="row no-gutters">
        <div id="sidebar" className="col-md-3">
          <div className="logo">
            <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
          </div>
          <ul className="list-unstyled components">
            <li>
              <a href="/tickets/admin"><i className="fas fa-ticket-alt"></i> Tickets</a>
            </li>
            <li className="active">
              <a href="/edit/admin"><i className="fas fa-edit"></i> Atualizar/Editar Software</a>
            </li>
            <li>
              <a href="/add/admin"><i className="fas fa-plus"></i> Adicionar Software</a>
            </li>
            <li>
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
          <h2 style={{ marginBottom: '3%' }}>Atualizar/Editar Software</h2>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="idproduto">ID do Produto</label>
                  <input type="text" className="form-control" id="idproduto" value={idproduto} onChange={(e) => setIdProduto(e.target.value)} placeholder="ID do Produto" required />
                  <label htmlFor="nome" className="mt-3">Nome</label>
                  <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
                  <label htmlFor="descricao" className="mt-3">Descrição</label>
                  <textarea className="form-control" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} rows="3" placeholder="Descrição"></textarea>
                  <label htmlFor="categoria" className="mt-3">Categoria</label>
                  <input type="text" className="form-control" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoria" />
                  <label htmlFor="versao" className="mt-3">Versão do Software</label>
                  <input type="text" className="form-control" id="versao" value={versao} onChange={(e) => setVersao(e.target.value)} placeholder="Versão do Software" />
                  <label htmlFor="precoproduto" className="mt-3">Preço</label>
                  <input type="text" className="form-control" id="precoproduto" value={precoproduto} onChange={(e) => setPrecoProduto(e.target.value)} placeholder="Preço" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="logotipo" className="mt-3">Logotipo</label>
                  <div className="file-upload-container">
                    <input type="file" id="logotipo" className="form-control-file" onChange={(e) => setLogotipo(e.target.files[0])} />
                    <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                  </div>
                  <label htmlFor="imagenssoftware" className="mt-3">Imagens do Software</label>
                  <div className="file-upload-container">
                    <input type="file" id="imagenssoftware" className="form-control-file" onChange={(e) => setImagensSoftware(e.target.files[0])} />
                    <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-end">
                  <button className="btn btn-danger" type="submit">Guardar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareUpdate;