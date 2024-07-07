import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../CSS/ware.css';

const ShopConfirm = () => {
    const [paymentOption, setPaymentOption] = useState('card');

    const handlePaymentOptionChange = (e) => {
        setPaymentOption(e.target.value);
    };

    // Verificar se o usuário está autenticado (exemplo simples)
    const isLoggedIn = localStorage.getItem('token') !== null;

    if (!isLoggedIn) {
        return <div>Você precisa iniciar sessão para acessar esta página.</div>;
    }

    return (
        <div class="d-flex flex-column min-vh-100">
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
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <button class="btn btn-outline-light" type="submit">Procurar</button>
                    </form>
                    <a href="/" class="btn btn-primary">Terminar Sessão</a>
                </div>
            </nav>

            <div class="flex-grow-1 d-flex justify-content-center align-items-center">
                <div class="containershop d-flex rounded shadow">
                    <div class="left-section bg-gradient-to-bottom rounded-left p-4 text-white">
                        <div class="text-center mb-4">
                            <div class="fs-3">Total: 2,648.00€</div>
                        </div>
                        <div class="payment-item mb-4">
                            <div class="payment-item-details d-flex align-items-center">
                                <img src="/images/Logos/figma.png" alt="Creative Cloud"/>
                                <div>
                                    <div>Creative Cloud</div>
                                    <div class="payment-item-quantity">
                                        <input type="number" defaultValue="66" min="1" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div>1,980.00€</div>
                        </div>
                        <div class="payment-item mb-4">
                            <div class="payment-item-details d-flex align-items-center">
                                <img src="/images/Logos/figma.png" alt="Office 365"/>
                                <div>
                                    <div>Office 365</div>
                                    <div class="payment-item-quantity">
                                        <input type="number" defaultValue="25" min="1" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div>668.00€</div>
                        </div>
                    </div>
                    <div class="right-section bg-white rounded-right p-4">
                        <div class="mb-3">
                            <label>Email</label>
                            <input type="email" class="form-control mb-3" placeholder="Endereço de email" />
                        </div>
                        <div class="mb-3">
                            <label>Opções de Pagamento</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paymentOptions" value="card" id="cardOption" checked={paymentOption === 'card'} onChange={handlePaymentOptionChange} />
                                <label class="form-check-label" htmlFor="cardOption">Cartão</label>
                            </div>
                            {paymentOption === 'card' && (
                                <div id="cardDetails">
                                    <label>Número do cartão</label>
                                    <input type="text" class="form-control mb-2" placeholder="1234 1234 1234 1234" />
                                    <div class="row">
                                        <div class="col">
                                            <label>Validade</label>
                                            <input type="text" class="form-control mb-2" placeholder="MM/YY" />
                                        </div>
                                        <div class="col">
                                            <label>CVC</label>
                                            <input type="text" class="form-control mb-2" placeholder="CVC" />
                                        </div>
                                    </div>
                                    <label>País</label>
                                    <input list="countries" class="form-control mb-3" placeholder="Digite ou selecione um país" />
                                    <datalist id="countries">
                                        {/* Include options here as needed */}
                                    </datalist>
                                </div>
                            )}
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paymentOptions" value="paypal" id="paypalOption" checked={paymentOption === 'paypal'} onChange={handlePaymentOptionChange} />
                                <label class="form-check-label" htmlFor="paypalOption">PayPal</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paymentOptions" value="bank" id="bankOption" checked={paymentOption === 'bank'} onChange={handlePaymentOptionChange} />
                                <label class="form-check-label" htmlFor="bankOption">Referência multibanco</label>
                            </div>
                        </div>
                        <a href="/shop/:idvenda/sucess" class="btn btn-primary mt-4">Feito</a>

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
};

export default ShopConfirm;
