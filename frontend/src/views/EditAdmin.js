import React from 'react';
import './editadmin.css'; // Import CSS file for styling

const SoftwareUpdate = () => {
  return (
    <div class="wrapper">
      <div class="row no-gutters">
        <div id="sidebar" class="col-md-3">
          <div class="logo">
            <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
          </div>
          <ul class="list-unstyled components">
            <li>
              <a href="/tickets/admin"><i class="fas fa-ticket-alt"></i> Tickets</a>
            </li>
            <li class="active">
              <a href="/edit/admin"><i class="fas fa-edit"></i> Atualizar/Editar Software</a>
            </li>
            <li>
              <a href="/add/admin"><i class="fas fa-plus"></i> Adicionar Software</a>
            </li>
            <li>
              <a href="/list/admin"><i class="fas fa-list"></i> Listar Software</a>
            </li>
            <li>
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
          <h2 style={{ marginBottom: '3%' }}>Atualizar/Editar Software</h2>
          <div class="form-container">
            <div class="row">
              <div class="col-md-6">
                <label htmlFor="software">Software</label>
                <select class="form-control" id="software">
                  <option>Selecionar Software</option>
                  {/* Adicionar mais opções conforme necessário */}
                </select>
                <label htmlFor="programmer" class="mt-3">Programador</label>
                <input type="text" class="form-control" id="programmer" placeholder="Programador" />
                <label htmlFor="category" class="mt-3">Categoria</label>
                <input type="text" class="form-control" id="category" placeholder="Categoria" />
                <label htmlFor="version" class="mt-3">Versão do Software</label>
                <input type="text" class="form-control" id="version" placeholder="Versão do Software" />
                <label htmlFor="description" class="mt-3">Descrição</label>
                <textarea class="form-control" id="description" rows="3" placeholder="Descrição"></textarea>
                <label htmlFor="price" class="mt-3">Preço</label>
                <input type="text" class="form-control" id="price" placeholder="Preço" />
              </div>
              <div class="col-md-6">
                <label htmlFor="logo" class="mt-3">Logotipo</label>
                <div class="file-upload-container">
                  <input type="file" id="logo" class="form-control-file" />
                  <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                  <button class="btn btn-primary">Selecionar ficheiro</button>
                </div>
                <label htmlFor="preview" class="mt-3">Pré-Visualização</label>
                <div class="file-upload-container">
                  <input type="file" id="preview" class="form-control-file" />
                  <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                  <button class="btn btn-primary">Selecionar ficheiro</button>
                </div>
                <label htmlFor="softwareFile" class="mt-3">Software</label>
                <div class="file-upload-container">
                  <input type="file" id="softwareFile" class="form-control-file" />
                  <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                  <button class="btn btn-primary">Selecionar ficheiro</button>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 text-end">
                <button class="btn btn-danger">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareUpdate;
