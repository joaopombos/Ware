import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/addadmin.css'; // Importe o arquivo CSS separado

const AddSoftware = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [versao, setVersao] = useState('');
  const [precoproduto, setPrecoProduto] = useState('');
  const [logotipo, setLogotipo] = useState(null);
  const [imagenssoftware, setImagensSoftware] = useState(null);
  const [idproduto, setIdProduto] = useState('');
  const [,setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      
      // Verificar se o token existe
      if (!token) {
        window.alert('Token de autenticação não encontrado.');
        return;
      }

      // Função para converter arquivo para base64
      const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      };

      // Converter logotipo para base64
      const logotipoBase64 = logotipo ? await convertToBase64(logotipo) : null;
      // Converter imagens do software para base64
      const imagenssoftwareBase64 = imagenssoftware ? await convertToBase64(imagenssoftware) : null;

      // Dados do software a serem enviados
      const softwareData = {
        nome,
        descricao,
        categoria,
        versao,
        precoproduto,
        idproduto,
        logotipo: logotipoBase64,
        imagenssoftware: imagenssoftwareBase64
      };

      console.log('Dados do software a serem enviados:', softwareData);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      console.log('Configuração da requisição:', config);

      console.log('Enviando requisição para adicionar software...');
      const response = await axios.post('http://localhost:3000/add/admin', softwareData, config);

      console.log('Resposta do servidor:', response.data);
      // Lógica de tratamento da resposta
      window.alert('Software adicionado com sucesso!');

      // Limpar campos após sucesso (opcional)
      setNome('');
      setDescricao('');
      setCategoria('');
      setVersao('');
      setPrecoProduto('');
      setIdProduto('');
      setLogotipo(null);
      setImagensSoftware(null);

    } catch (error) {
      console.error('Erro ao adicionar software:', error);
      // Tratamento de erro
      if (error.response) {
        console.error('Erro de resposta:', error.response.data);
        setError(error.response.data.error); // Define o erro para exibição na interface
        window.alert(`Erro ao adicionar software: ${error.response.data.error}`);
      } else if (error.request) {
        console.error('Erro de requisição:', error.request);
        window.alert('Erro ao adicionar software: Erro de requisição.');
      } else {
        console.error('Erro geral:', error.message);
        window.alert(`Erro ao adicionar software: ${error.message}`);
      }
    }
  };

  // Função para lidar com seleção de logotip
  const handleLogotipoChange = (e) => {
    setLogotipo(e.target.files[0]);
  };

  // Função para lidar com seleção de imagens do software
  const handleImagensSoftwareChange = (e) => {
    setImagensSoftware(e.target.files[0]);
  };

  // Verificar se o usuário está autenticado (exemplo simples)
  const isLoggedIn = localStorage.getItem('token') !== null;

  if (!isLoggedIn) {
    return <div>Você precisa iniciar sessão para acessar esta página.</div>;
  }

  return (
    <div className="body-container">
      <div id="sidebar">
        <div className="logo">
          <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
        </div>
        <ul className="components">
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
          <a href="/" className="btn btn-primary">Terminar Sessão</a>
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
              <input
                type="number"
                className="form-control"
                id="idproduto"
                value={idproduto}
                onChange={(e) => setIdProduto(e.target.value)}
                placeholder="ID do Produto"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="logotipo" className="mt-3">Logotipo</label>
              <div className="file-upload-container">
                <input type="file" id="logotipo" className="form-control-file" onChange={handleLogotipoChange} />
                <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                <button className="btn btn-primary">Selecionar arquivo</button>
              </div>
              <label htmlFor="imagenssoftware" className="mt-3">Imagens do Software</label>
              <div className="file-upload-container">
                <input type="file" id="imagenssoftware" className="form-control-file" onChange={handleImagensSoftwareChange} />
                <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                <button className="btn btn-primary">Selecionar arquivo</button>
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
};

export default AddSoftware;
