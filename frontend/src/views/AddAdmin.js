import React, { useState } from 'react';
import axios from 'axios';
import './addadmin.css'; // Importa o arquivo CSS separad

const AddSoftware = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [versao, setVersao] = useState('');
  const [precoproduto, setPrecoProduto] = useState('');
  const [logotipo, setLogotipo] = useState(null);
  const [imagenssoftware, setImagensSoftware] = useState(null);
  const [idProduto, setIdProduto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const softwareData = {
        nome,
        descricao,
        categoria,
        idproduto: idProduto,
        versao,
        precoproduto,
        logotipo,
        imagenssoftware,
      };

      // Retrieve the token from localStorage
      const token = localStorage.getItem('token'); // Ensure the token is correctly stored in localStorage
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post('http://localhost:3000/add/admin', softwareData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      console.log('Resposta do servidor:', response.data);
      alert('Software adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar software:', error);
      alert('Erro ao adicionar software');
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
            <a href="/edit/admin"><i className="fas fa-edit"></i> Atualizar/Editar Software</a>
          </li>
          <li className="active">
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
          <button className="btn btn-primary">Terminar Sessão</button>
        </div>
      </div>

      <div id="content">
        <h2>Adicionar Software</h2>
        <div className="form-container">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="nome">Nome</label>
              <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
              <label htmlFor="descricao" className="mt-3">Descrição</label>
              <textarea className="form-control" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} rows="3" placeholder="Descrição"></textarea>
              <label htmlFor="categoria" className="mt-3">Categoria</label>
              <input type="text" className="form-control" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoria" />
              <label htmlFor="versao" className="mt-3">Versão do Software</label>
              <input type="text" className="form-control" id="versao" value={versao} onChange={(e) => setVersao(e.target.value)} placeholder="Versão do Software" />
              <label htmlFor="precoproduto" className="mt-3">Preço</label>
              <input type="text" className="form-control" id="precoproduto" value={precoproduto} onChange={(e) => setPrecoProduto(e.target.value)} placeholder="Preço" />
              <label htmlFor="idproduto" className="mt-3">ID do Produto</label>
              <input type="text" className="form-control" id="idproduto" value={idProduto} onChange={(e) => setIdProduto(e.target.value)} placeholder="ID do Produto" />
            </div>
            <div className="col-md-6">
              <label htmlFor="logotipo" className="mt-3">Logotipo</label>
              <div className="file-upload-container">
                <input type="file" id="logotipo" className="form-control-file" onChange={(e) => setLogotipo(e.target.files[0])} />
                <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                <button className="btn btn-primary">Selecionar ficheiro</button>
              </div>
              <label htmlFor="imagenssoftware" className="mt-3">Imagens do Software</label>
              <div className="file-upload-container">
                <input type="file" id="imagenssoftware" className="form-control-file" onChange={(e) => setImagensSoftware(e.target.files[0])} />
                <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                <button className="btn btn-primary">Selecionar ficheiro</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-end">
              <button className="btn btn-danger" onClick={handleSubmit}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSoftware;
