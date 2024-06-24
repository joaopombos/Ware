import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './library.css';

const MySoftwares = () => {
    const handleButtonClick = (url) => {
        window.location.href = url;
    };

    const renderCard = () => (
        <div className="col-sm-2">
            <div className="card">
                <button className="btn-img" onClick={() => handleButtonClick("licensecompgestor.html")}>
                    <img src="/images/Logos/figma.png" className="card-img-top" alt="..." />
                </button>
                <div className="card-body">
                    <h5 className="card-title">Nome Software</h5>
                    <p className="card-text">Licenças</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="d-flex flex-column min-vh-100">
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="principalcomprador.html">
                        <img src="/images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ marginLeft: '-32%' }}>
                        <div className="navbar-nav">
                            <a className="nav-link active text-white" aria-current="page" href="principalcomprador.html">Explorar</a>
                            <a className="nav-link text-white" href="/license">Gestão</a>

                        </div>
                    </div>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">Procurar</button>
                    </form>
                    <button className="btn btn-outline-light me-2" style={{ marginLeft: '0.5%' }} type="button">
                        <i className="bi bi-cart4"></i>
                    </button>
                    <a href="/home" className="btn btn-primary">Terminar Sessão</a>

                </div>
            </nav>

            <h1 className="my-5" style={{ marginLeft: '5%' }}>Os meus softwares</h1>

            <div className="container" style={{ marginBottom: '5%', marginTop:'-1%' }}>
                <div className="row">
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                </div>
            </div>

            <footer class="footer bg-dark text-light fixed-bottom">
        <div class="container d-flex justify-content-center align-items-center">
          <span class="text-center">&copy; Ware 2024</span>
        </div>
      </footer>
        </div>
    );
};

export default MySoftwares;
