import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './license.css';

function App() {
    return (
        <div>
             {/* NAVBAR */}
             <nav className="navbar navbar-expand-lg bg-dark">
                 <div className="container-fluid">
                     <a className="navbar-brand" href="principalcomprador.html">
                         <img src="images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" />
                     </a>
                     <button
                         className="navbar-toggler"
                         type="button"
                         data-bs-toggle="collapse"
                         data-bs-target="#navbarNavAltMarkup"
                         aria-controls="navbarNavAltMarkup"
                         aria-expanded="false"
                         aria-label="Toggle navigation"
                     >
                         <span className="navbar-toggler-icon"></span>
                     </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                         <div className="navbar-nav">
                             <a className="nav-link active text-white" aria-current="page" href="principalcomprador.html">Explorar</a>
                             <a className="nav-link text-white" href="librarycompgestor.html">Gestão</a>
                         </div>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Procurar</button>
                        </form>
                        <button className="btn btn-outline-light me-2" type="button">
                            <i className="bi bi-cart4"></i>
                        </button>
                        <button className="btn btn-outline-light me-2" type="button">Terminar Sessão</button>
                     </div>
                 </div>
             </nav>
             {/* FIM NAVBAR */}

            {/* CARD APLICAÇÃO */}
            <div className="card app-card" style={{ backgroundColor: 'transparent' }}>
                 <div className="row no-gutters align-items-center">
                     <div className="col-md-3">
                         <img src="images/Logos/figma.png" className="card-img" alt="..." />
                     </div>
                     <div className="col-md-8 d-flex justify-content-between align-items-center">
                         <div className="card-body">
                             <h5 className="card-title">Nome Software</h5>
                             <p className="card-text">Nº de licenças</p>
                         </div>
                         <div className="col-md-3 d-flex justify-content-between align-items-center">
                             <button className="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#myModal">Atribuir</button>
                             <button className="btn btn-danger btn-sm" style={{ marginLeft: '20%' }} data-toggle="modal" data-target="#myModal2">Ticket</button>
                         </div>
                     </div>
                 </div>
             </div>
            {/* FIM CARD APLICAÇÃO */}

            {/* TABELA */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Computadores com licença ativa</th>
                        <th scope="col">Remover licença</th>
                        <th scope="col">Ultima atualização</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            PC-123
                            <button className="btn btn-icon" aria-label="Info" data-toggle="modal" data-target="#myModal1">
                                <i className="bi bi-info-circle"></i>
                            </button>
                        </th>
                        <td><button className="btn btn-danger btn-sm">Remover</button></td>
                        <td>08/03/2024 às 09:27</td>
                    </tr>
                    {/* Additional rows as needed */}
                </tbody>
            </table>
            {/* FIM TABELA */}

            {/* POPUP CHAVE */}
            <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Chave da licença a ser atribuída:</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            XXXX-XXXX-XXXX-XXX
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Feito</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* FIM POPUP CHAVE */}

            {/* POPUP INFO */}
            <div className="modal fade" id="myModal1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h3>Licença:</h3>
                            <div className="rounded bg-light p-2 centered-div">
                                <p className="mb-0">Nº Computador</p>
                            </div>
                            <h3 style={{ marginTop: '2%' }}>Produtos:</h3>
                            <div className="rounded bg-light p-3">
                                <div className="product-item">
                                    <img src="https://via.placeholder.com/50" alt="Placeholder Image" />
                                    <p className="mb-0">NOME</p>
                                </div>
                                <div className="product-item">
                                    <img src="https://via.placeholder.com/50" alt="Placeholder Image" />
                                    <p className="mb-0">NOME</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* FIM POPUP INFO */}

            {/* POPUP TICKET */}
            <div className="modal fade" id="myModal2">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h3>Software:</h3>
                            <div className="rounded bg-light p-2 centered-div">
                                <p className="mb-0">NOME</p>
                            </div>
                            <h3 style={{ marginTop: '2%' }}>Ticket:</h3>
                            <div className="rounded bg-light p-3">
                                <input type="text" className="form-control" placeholder="Introduza aqui o seu ticket." />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* FIM POPUP TICKET */}

             {/* FOOTER */}
            <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
                <footer className="footer bg-dark text-light text-center">
                    <div className="container">
                        <span>&copy; Ware 2024</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
