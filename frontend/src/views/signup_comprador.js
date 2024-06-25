import axios from 'axios';
import React, { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faCamera, faVideo, faCubes, faEdit, faBrush, faFileAlt, faMusic, faNetworkWired } from '@fortawesome/free-solid-svg-icons';


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
                    <a className="navbar-brand" href="/signup_comprador">
                        <img src="/images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ marginLeft: '-32%' }}>
                        <div className="navbar-nav">
                            <a className="nav-link text-white" href="/shop/my">Explorar</a>
                            <a className="nav-link active text-white" aria-current="page" href="/library">Gestão</a>
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
            {/* FIM NAVBAR */}

            {/* TITULO */}
            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Os mais vendidos</h1>

            {/* CARROSSEL OS MAIS VENDIDOS */}
            <div id="carouselmaisvendidos" class="carousel slide mx-auto" data-bs-ride="carousel" style={{ maxWidth: '90%' }}>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="row justify-content-center">
                            <div class="col-md-3">
                                <div class="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', width: '18rem' }}>
                                    <img src="/images/mais_vendidos/Illustrator.jpg" class="card-img-top img-fluid" alt="Adobe Illustrator" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-2">Adobe Illustrator</h5>
                                        <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p class="card-text mb-2" style={{ color: 'grey' }}>Design</p>
                                        <p class="card-text">De ilustrações a logotipos, tenha todas as ferramentas necessárias para seus projetos de design gráfico.</p>
                                        <a href="#" class="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', width: '18rem' }}>
                                    <img src="/images/mais_vendidos/Davinci.jpg" class="card-img-top img-fluid" alt="DaVinci Resolve" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-2">DaVinci Resolve</h5>
                                        <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p class="card-text mb-2" style={{ color: 'grey' }}>Edição de Vídeo</p>
                                        <p class="card-text">A ferramenta mais poderosa de Hollywood para edição profissional em pós-edição de áudio!</p>
                                        <a href="#" class="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', width: '18rem' }}>
                                    <img src="/images/mais_vendidos/Sketchup.jpg" class="card-img-top img-fluid" alt="SketchUp" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-2">SketchUp</h5>
                                        <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p class="card-text mb-2" style={{ color: 'grey' }}>Modelagem 3D</p>
                                        <p class="card-text">Dê vida aos seus conceitos mais loucos e reimagine o que é possível fazer, tudo num software.</p>
                                        <a href="#" class="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row justify-content-center">
                            <div class="col-md-3">
                                <div class="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', width: '18rem' }}>
                                    <img src="/images/mais_vendidos/Zoom.jpg" class="card-img-top img-fluid" alt="Zoom" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-2">Zoom</h5>
                                        <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p class="card-text mb-2" style={{ color: 'grey' }}>Produtividade</p>
                                        <p class="card-text">Uma plataforma para conexões humanas ilimitadas. Conecte-se com amigos e colegas através de videoconferências.</p>
                                        <a href="#" class="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', width: '18rem' }}>
                                    <img src="/images/mais_vendidos/VisualStudio.jpg" class="card-img-top img-fluid" alt="Microsoft Excel" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-2">Microsoft Excel</h5>
                                        <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p class="card-text mb-2" style={{ color: 'grey' }}>Planilhas</p>
                                        <p class="card-text">A ferramenta essencial para criar, organizar e analisar dados com precisão. Domine seus dados com facilidade.</p>
                                        <a href="#" class="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', width: '18rem' }}>
                                    <img src="/images/mais_vendidos/Wordpress.jpg" class="card-img-top img-fluid" alt="AutoCAD" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-2">AutoCAD</h5>
                                        <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p class="card-text mb-2" style={{ color: 'grey' }}>Desenho Técnico</p>
                                        <p class="card-text">A ferramenta de design assistido por computador mais poderosa do mercado, com precisão de engenharia.</p>
                                        <a href="#" class="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselmaisvendidos" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselmaisvendidos" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            {/* FIM CARROSSEL OS MAIS VENDIDOS */}



            <hr class="custom-hr" />

            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Últimas atualizações</h1>

            <div id="carouselatualizacoes" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="row justify-content-center">
                            <div class="col-6 d-flex flex-column align-items-center">
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/excel.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Microsoft Excel</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/asana.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Comunicação</p>
                                                <h5 class="card-title">Asana</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-column align-items-center" style={{ marginleft: '-5%' }}>
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/dropbox.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtivade</p>
                                                <h5 class="card-title">DropBox</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/miro.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Comunicação</p>
                                                <h5 class="card-title">Miro</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row justify-content-center">
                            <div class="col-6 d-flex flex-column align-items-center">
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/notion.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtivade</p>
                                                <h5 class="card-title">Notion</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/fcp.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Vídeo</p>
                                                <h5 class="card-title">Final Cut Pro</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-column align-items-center" style={{ marginleft: '-5%' }}>
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/office.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Office 365</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/slack.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Slack</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselatualizacoes" data-bs-slide="prev" >
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselatualizacoes" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>


            <hr class="custom-hr" />

            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Recomendado para si</h1>

            <div id="carouselrecomendado" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="row justify-content-center">
                            <div class="col-6 d-flex flex-column align-items-center">
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/excel.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Microsoft Excel</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/asana.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Comunicação</p>
                                                <h5 class="card-title">Asana</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-column align-items-center" style={{ marginleft: '-5%' }}>
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/dropbox.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtivade</p>
                                                <h5 class="card-title">DropBox</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/miro.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Comunicação</p>
                                                <h5 class="card-title">Miro</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row justify-content-center">
                            <div class="col-6 d-flex flex-column align-items-center">
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/notion.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtivade</p>
                                                <h5 class="card-title">Notion</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/fcp.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Vídeo</p>
                                                <h5 class="card-title">Final Cut Pro</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-column align-items-center" style={{ marginleft: '-5%' }}>
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/office.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Office 365</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/slack.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Slack</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselrecomendado" data-bs-slide="prev" >
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselrecomendado" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <hr class="custom-hr" />


            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Avaliações</h1>


            <div class="row" style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                <div class="col-md-3 mb-4">
                     <div class="card" style={{ marginBottom: '5%', width: '18rem' }}>
                        <img src="/images/icons/aspas.png" class="card-img-top img-fluid mx-auto d-block" style={{ width: '75%', margintop: '30px' }} alt="..." />
                         <div class="card-body text-center">
                             <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                 est id, tristique viverra mauris. </p>
                             <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                             <p class="card-text mb-2">Categoria</p>
                         </div>
                     </div>
                 </div>
                <div class="col-md-3 mb-4">
                     <div class="card" style={{ marginBottom: '5%', width: '18rem' }}>
                        <img src="/images/icons/aspas.png" class="card-img-top img-fluid mx-auto d-block" style={{ width: '75%', margintop: '30px' }} alt="..." />
                         <div class="card-body text-center">
                             <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                 est id, tristique viverra mauris. </p>
                             <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                             <p class="card-text mb-2">Categoria</p>
                         </div>
                     </div>
                 </div>
                <div class="col-md-3 mb-4">
                     <div class="card" style={{ marginBottom: '5%', width: '18rem' }}>
                        <img src="/images/icons/aspas.png" class="card-img-top img-fluid mx-auto d-block" style={{ width: '75%', margintop: '30px' }} alt="..." />
                         <div class="card-body text-center">
                             <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                 est id, tristique viverra mauris. </p>
                             <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                             <p class="card-text mb-2">Categoria</p>
                         </div>
                     </div>
                 </div>
            </div>

            <footer class="footer bg-dark text-light">
                <div class="container d-flex justify-content-center align-items-center">
                    <span class="text-center">&copy; Ware 2024</span>
                 </div>
             </footer>
        </div>
    );

}