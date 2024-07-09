import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/ware.css';

export default function EditComponent() {
    // Removed unused useState hooks
    // Verificar se o usuário está autenticado (exemplo simples)
    const isLoggedIn = localStorage.getItem('token') !== null;

    if (!isLoggedIn) {
        return <div>Você precisa iniciar sessão para acessar esta página.</div>;
    }

    return (
        <div>
            {/* NAVBAR */}
            <nav class="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/signup/comprador">
                        <img class="warelogo" src="/images/Logos/logo.png" alt="Ware Logo" />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link text-white" href="/shop">Explorar</a>
                            <a class="nav-link active text-white" aria-current="page" href="/library">Gestão</a>
                        </div>
                    </div>
                    <form class="d-flex me-3" role="search">
                        <input class="navform form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <button class="btn btn-outline-light" type="submit">Procurar</button>
                    </form>
                    <a href="/" class="btn btn-primary">Terminar Sessão</a>
                </div>
            </nav>
            {/* FIM NAVBAR */}

            {/* TITULO */}
            <h1 class="titulo">Os mais vendidos</h1>

            {/* CARROSSEL OS MAIS VENDIDOS */}
            <div id="carouselmaisvendidos" class="carousel slide mx-auto" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="row justify-content-center">
                            <div class="col-md-3">
                                <div class="cardvendidos card mb-3">
                                    <img src="/images/mais_vendidos/Illustrator.jpg" class="card-img-top img-fluid" alt="Adobe Illustrator" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-2">Adobe Illustrator</h5>
                                        <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p class="cardcat card-text mb-2">Design</p>
                                        <p class="card-text">De ilustrações a logotipos, todas as ferramentas necessárias para seus projetos de design gráfico.</p>
                                        <a href="/shop/:idproduto/" class="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="cardvendidos card mb-3">
                                    <img src="/images/mais_vendidos/Davinci.jpg" class="card-img-top img-fluid" alt="DaVinci Resolve" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-2">DaVinci Resolve</h5>
                                        <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p class="cardcat card-text mb-2">Edição de Vídeo</p>
                                        <p class="card-text">A ferramenta mais poderosa de Hollywood para edição profissional em pós-edição de áudio!</p>
                                        <a href="/shop/:idproduto/" class="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="cardvendidos card mb-3">
                                    <img src="/images/mais_vendidos/Sketchup.jpg" class="card-img-top img-fluid" alt="SketchUp" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-2">SketchUp</h5>
                                        <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p class="cardcat card-text mb-2">Modelagem 3D</p>
                                        <p class="card-text">Dê vida aos seus conceitos mais loucos e reimagine o que é possível fazer, tudo num software.</p>
                                        <a href="/shop/:idproduto/" class="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row justify-content-center">
                            <div class="col-md-3">
                                <div class="cardvendidos card mb-3">
                                    <img src="/images/mais_vendidos/Zoom.jpg" class="card-img-top img-fluid" alt="Zoom" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-2">Zoom</h5>
                                        <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p class="cardcat card-text mb-2">Produtividade</p>
                                        <p class="card-text">Uma plataforma para conexões humanas ilimitadas. Conecte-se com amigos e colegas através de videoconferências.</p>
                                        <a href="/shop/:idproduto/" class="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="cardvendidos card mb-3">
                                    <img src="/images/mais_vendidos/VisualStudio.jpg" class="card-img-top img-fluid" alt="Microsoft Excel" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-2">Microsoft Excel</h5>
                                        <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p class="cardcat card-text mb-2">Planilhas</p>
                                        <p class="card-text">A ferramenta essencial para criar, organizar e analisar dados com precisão. Domine seus dados com facilidade.</p>
                                        <a href="/shop/:idproduto/" class="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="cardvendidos card mb-3">
                                    <img src="/images/mais_vendidos/Wordpress.jpg" class="card-img-top img-fluid" alt="AutoCAD" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-2">AutoCAD</h5>
                                        <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p class="cardcat card-text mb-2">Desenho Técnico</p>
                                        <p class="card-text">A ferramenta de design assistido por computador mais poderosa do mercado, com precisão de engenharia.</p>
                                        <a href="/shop/:idproduto/" class="btn btn-dark w-100">Saber mais</a>
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

            <h1 class="titulo">Últimas atualizações</h1>

            <div id="carouselatualizacoes" class="carousel slide mx-auto" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="row justify-content-center">
                            <div class="upscreen col-6 d-flex flex-column align-items-center">
                                <div class="cardup card card-custom" >
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/excel.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Microsoft Excel</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="cardup card card-custom mt-3">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/asana.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Comunicação</p>
                                                <h5 class="card-title">Asana</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-column align-items-center">
                                <div class="cardup card card-custom">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/dropbox.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtivade</p>
                                                <h5 class="card-title">DropBox</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="cardup card card-custom mt-3">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/miro.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Comunicação</p>
                                                <h5 class="card-title">Miro</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row justify-content-center">
                            <div class="upscreen col-6 d-flex flex-column align-items-center">
                                <div class="cardup card card-custom">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/notion.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtivade</p>
                                                <h5 class="card-title">Notion</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="cardup card card-custom mt-3">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/fcp.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Vídeo</p>
                                                <h5 class="card-title">Final Cut Pro</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-column align-items-center">
                                <div class="cardup card card-custom">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/office.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Office 365</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="cardup card card-custom mt-3">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/slack.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Slack</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
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

            <h1 class="titulo">Avaliações</h1>



            <div class="avrow row">
                <div class="col-md-3 mb-4">
                    <div class="cardvav card">
                        <img src="/images/icons/aspas.png" class="aspas card-img-top img-fluid mx-auto d-block" alt="..." />
                        <div class="card-body text-center">
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                est id, tristique viverra mauris. </p>
                            <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                            <p class="card-text mb-2">Categoria</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-4">
                    <div class="cardvav card">
                        <img src="/images/icons/aspas.png" class="aspas card-img-top img-fluid mx-auto d-block" alt="..." />
                        <div class="card-body text-center">
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                est id, tristique viverra mauris. </p>
                            <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                            <p class="card-text mb-2">Categoria</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-4">
                    <div class="cardvav card">
                        <img src="/images/icons/aspas.png" class="aspas card-img-top img-fluid mx-auto d-block" alt="..." />
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