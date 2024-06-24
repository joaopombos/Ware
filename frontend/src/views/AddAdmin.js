import React from 'react';
import './addadmin.css'; // Import the separated CSS file

const AddSoftware = () => {
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
              <label htmlFor="softwareName">Nome</label>
              <input type="text" className="form-control" id="softwareName" placeholder="Nome" />
              <label htmlFor="programmer" className="mt-3">Programador</label>
              <input type="text" className="form-control" id="programmer" placeholder="Programador" />
              <label htmlFor="category" className="mt-3">Categoria</label>
              <input type="text" className="form-control" id="category" placeholder="Categoria" />
              <label htmlFor="version" className="mt-3">Versão do Software</label>
              <input type="text" className="form-control" id="version" placeholder="Versão do Software" />
              <label htmlFor="price" className="mt-3">Preço</label>
              <input type="text" className="form-control" id="price" placeholder="Preço" />
              <label htmlFor="description" className="mt-3">Descrição</label>
              <textarea className="form-control" id="description" rows="3" placeholder="Descrição"></textarea>
            </div>
            <div className="col-md-6">
              <label htmlFor="logo" className="mt-3">Logotipo</label>
              <div className="file-upload-container">
                <input type="file" id="logo" className="form-control-file" />
                <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                <button className="btn btn-primary">Selecionar ficheiro</button>
              </div>
              <label htmlFor="preview" className="mt-3">Pré-Visualização</label>
              <div className="file-upload-container">
                <input type="file" id="preview" className="form-control-file" />
                <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                <button className="btn btn-primary">Selecionar ficheiro</button>
              </div>
              <label htmlFor="softwareFile" className="mt-3">Software</label>
              <div className="file-upload-container">
                <input type="file" id="softwareFile" className="form-control-file" />
                <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                <button className="btn btn-primary">Selecionar ficheiro</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-end">
              <button className="btn btn-danger">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSoftware;
