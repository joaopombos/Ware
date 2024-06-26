import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './editadmin.css'; // Import CSS file for styling

const SoftwareUpdate = () => {
  const { idproduto } = useParams();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [versao, setVersao] = useState('');
  const [precoproduto, setPrecoProduto] = useState('');
  const [logotipo, setLogotipo] = useState(null);
  const [imagenssoftware, setImagensSoftware] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/edit/admin/${idproduto}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const software = response.data;
        setNome(software.nome);
        setDescricao(software.descricao);
        setCategoria(software.categoria);
        setVersao(software.versao);
        setPrecoProduto(software.precoproduto);
      } catch (error) {
        console.error('Erro ao buscar software:', error);
        setError('Erro ao buscar software.');
      }
    };

    fetchSoftware();
  }, [idproduto]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('descricao', descricao);
      formData.append('categoria', categoria);
      formData.append('versao', versao);
      formData.append('precoproduto', precoproduto);
      if (logotipo) formData.append('logotipo', logotipo);
      Array.from(imagenssoftware).forEach(file => {
        formData.append('imagenssoftware', file);
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      };

      const response = await axios.put(`http://localhost:3000/update/admin/${idproduto}`, formData, config);

      window.alert('Software atualizado com sucesso!');
      setNome('');
      setDescricao('');
      setCategoria('');
      setVersao('');
      setPrecoProduto('');
      setLogotipo(null);
      setImagensSoftware([]);

      navigate('/edit/admin');
    } catch (error) {
      console.error('Erro ao atualizar software:', error);
      if (error.response) {
        console.error('Erro de resposta:', error.response.data);
        setError(error.response.data.error);
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
            <li>
              <a href="/add/admin"><i className="fas fa-plus"></i> Adicionar Software</a>
            </li>
            <li>
              <a href="/list/admin"><i className="fas fa-list"></i> Listar Software</a>
            </li>
            <li>
              <a href="#"><i className="fas fa-file-invoice-dollar"></i> Orçamentos</a>
            </li>
            <li>
              <a href="#"><i className="fas fa-chart-line"></i> Métricas de vendas</a>
            </li>
          </ul>
        </div>

        <div id="content" className="col-md-9">
          <h2 style={{ marginBottom: '3%' }}>Atualizar Software</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <textarea
                className="form-control"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <input
                type="text"
                className="form-control"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Versão</label>
              <input
                type="text"
                className="form-control"
                value={versao}
                onChange={(e) => setVersao(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Preço</label>
              <input
                type="number"
                className="form-control"
                value={precoproduto}
                onChange={(e) => setPrecoProduto(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Logotipo</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setLogotipo(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <label>Imagens do Software</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={(e) => setImagensSoftware(e.target.files)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Atualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SoftwareUpdate; 