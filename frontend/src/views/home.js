import axios from 'axios';
import React, { useState } from "react";

export default function EditComponent() {
    const [campTitulo, setCampTitulo] = useState("");
    const [campDescricao, setCampDescricao] = useState("");
    const [campFoto, setCampFoto] = useState("");
    const [selectGeneroId, setSelectGeneroId] = useState("");

    const handleFotoChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fotoBase64 = reader.result;
                setCampFoto(fotoBase64);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div>
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src="images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
                    <a href="/login">
                        <button className="btn btn-outline-light me-2" type="button">
                            Iniciar Sessão
                        </button>
                    </a>
                </div>
            </nav>
            {/* FIM NAVBAR */}

            {/* ESPAÇO HEROI */}
            <div className="heroi" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-3%' }}>
                <div className="textoheroi" style={{ backgroundColor: 'rgba(90, 90, 90, 0.632)', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h1 style={{ textAlign: 'center', margin: '0.5rem 0', color: 'white' }}>Conectar empresas</h1>
                    <h1 style={{ textAlign: 'center', margin: '0.5rem 0', color: 'white', marginTop: '-1%' }}>com soluções inteligentes</h1>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <input type="text" style={{ width: '27%', marginRight: '1rem', marginTop: '5%' }} className="form-control" placeholder="Procurar aplicações disponíveis" />
                        <button style={{ float: 'right', marginTop: '5%' }} className="btn btn-outline-light">Procurar</button>
                    </div>
                    <div style={{ position: 'absolute', bottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <i className="bi bi-arrow-down-circle" style={{ color: 'white', fontSize: '3em' }}></i>
                        <label style={{ color: 'white' }}>Scroll</label>
                    </div>
                </div>
            </div>
            {/* FIM ESPAÇO HEROI */}

            {/* SOBRE WARE */}
            <div style={{ backgroundColor: 'rgba(128, 128, 128, 0.351)', height: '40rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', fontSize: 'medium' }}>
                    <img style={{ width: '50%', marginBottom: '10%' }} src="images/Logos/logotipo.svg" alt="Logo" />
                    <p style={{ fontSize: '20px' }}>A Ware é uma empresa jovem especializada em oferecer soluções de software </p>
                    <p style={{ fontSize: '20px' }}>inovadoras. A sua ampla gama de softwares atende às necessidades variadas de</p>
                    <p style={{ fontSize: '20px' }}>clientes, desde pequenas empresas até grandes corporações, impulsionando a </p>
                    <p style={{ fontSize: '20px' }}>eficiência e a produtividade.</p>
                </div>
            </div>
            {/* FIM SOBRE WARE */}

            {/* TITULO */}
            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Os mais vendidos</h1>

            {/* CARROSSEL OS MAIS VENDIDOS */}
            <div id="carouselmaisvendidos" className="carousel slide mx-auto" data-bs-ride="carousel" style={{ maxWidth: '90%' }}>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row justify-content-center">
                            <div className="col-md-3">
                                <div className="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <img src="images/mais_vendidos/Illustrator.jpg" className="card-img-top img-fluid" alt="Adobe Illustrator" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">Adobe Illustrator</h5>
                                        <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p className="card-text mb-2" style={{ color: 'grey' }}>Design</p>
                                        <p className="card-text">De ilustrações a logotipos, tenha todas as ferramentas necessárias para seus projetos de design gráfico.</p>
                                        <a href="#" className="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <img src="images/mais_vendidos/Davinci.jpg" className="card-img-top img-fluid" alt="DaVinci Resolve" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">DaVinci Resolve</h5>
                                        <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p className="card-text mb-2" style={{ color: 'grey' }}>Edição de Vídeo</p>
                                        <p className="card-text">A ferramenta mais poderosa de Hollywood para edição profissional em pós-edição de áudio!</p>
                                        <a href="#" className="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <img src="images/mais_vendidos/Sketchup.jpg" className="card-img-top img-fluid" alt="SketchUp" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">SketchUp</h5>
                                        <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p className="card-text mb-2" style={{ color: 'grey' }}>Modelagem 3D</p>
                                        <p className="card-text">Dê vida aos seus conceitos mais loucos e reimagine o que é possível fazer, tudo num software.</p>
                                        <a href="#" className="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row justify-content-center">
                            <div className="col-md-3">
                                <div className="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <img src="images/mais_vendidos/Zoom.jpg" className="card-img-top img-fluid" alt="Zoom" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">Zoom</h5>
                                        <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p className="card-text mb-2" style={{ color: 'grey' }}>Produtividade</p>
                                        <p className="card-text">Uma plataforma para conexões humanas ilimitadas. Conecte-se com amigos e colegas através de videoconferências.</p>
                                        <a href="#" className="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <img src="images/mais_vendidos/Excel.png" className="card-img-top img-fluid" alt="Microsoft Excel" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">Microsoft Excel</h5>
                                        <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p className="card-text mb-2" style={{ color: 'grey' }}>Planilhas</p>
                                        <p className="card-text">A ferramenta essencial para criar, organizar e analisar dados com precisão. Domine seus dados com facilidade.</p>
                                        <a href="#" className="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <img src="images/mais_vendidos/Autocad.jpg" className="card-img-top img-fluid" alt="AutoCAD" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">AutoCAD</h5>
                                        <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p className="card-text mb-2" style={{ color: 'grey' }}>Desenho Técnico</p>
                                        <p className="card-text">A ferramenta de design assistido por computador mais poderosa do mercado, com precisão de engenharia.</p>
                                        <a href="#" className="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselmaisvendidos" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselmaisvendidos" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* FIM CARROSSEL OS MAIS VENDIDOS */}
            <footer class="footer bg-dark text-light text-center">
                <div class="container">
                    <span>&copy; Ware 2024</span>
                </div>
            </footer>
        </div>
    );
}