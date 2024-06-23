import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './shopconfirm.css';

const ShopConfirm = () => {
    const [paymentOption, setPaymentOption] = useState('card');

    const handlePaymentOptionChange = (e) => {
        setPaymentOption(e.target.value);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">
                        <img src="/images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
                    <button className="btn btn-outline-light me-2" type="button">Terminar Sessão</button>
                </div>
            </nav>
            
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="container d-flex rounded shadow">
                    <div className="left-section bg-gradient-to-bottom rounded-left p-4 text-white" style={{ width: '50%' }}>
                        <div className="text-center mb-4">
                            <div className="fs-3">Total: 2,648.00€</div>
                        </div>
                        <div className="payment-item mb-4">
                            <div className="payment-item-details d-flex align-items-center">
                                <img src="/images/Logos/figma.png" alt="Creative Cloud" style={{ width: '50px', marginRight: '1rem' }} />
                                <div>
                                    <div>Creative Cloud</div>
                                    <div className="payment-item-quantity">
                                        <input type="number" defaultValue="66" min="1" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div>1,980.00€</div>
                        </div>
                        <div className="payment-item mb-4">
                            <div className="payment-item-details d-flex align-items-center">
                                <img src="/images/Logos/figma.png" alt="Office 365" style={{ width: '50px', marginRight: '1rem' }} />
                                <div>
                                    <div>Office 365</div>
                                    <div className="payment-item-quantity">
                                        <input type="number" defaultValue="25" min="1" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div>668.00€</div>
                        </div>
                    </div>
                    <div className="right-section bg-white rounded-right p-4" style={{ width: '50%' }}>
                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control mb-3" placeholder="Endereço de email" />
                        </div>
                        <div className="mb-3">
                            <label>Opções de Pagamento</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="paymentOptions" value="card" id="cardOption" checked={paymentOption === 'card'} onChange={handlePaymentOptionChange} />
                                <label className="form-check-label" htmlFor="cardOption">Cartão</label>
                            </div>
                            {paymentOption === 'card' && (
                                <div id="cardDetails">
                                    <label>Número do cartão</label>
                                    <input type="text" className="form-control mb-2" placeholder="1234 1234 1234 1234" />
                                    <div className="row">
                                        <div className="col">
                                            <label>Validade</label>
                                            <input type="text" className="form-control mb-2" placeholder="MM/YY" />
                                        </div>
                                        <div className="col">
                                            <label>CVC</label>
                                            <input type="text" className="form-control mb-2" placeholder="CVC" />
                                        </div>
                                    </div>
                                    <label>País</label>
                                    <input list="countries" className="form-control mb-3" placeholder="Digite ou selecione um país" />
                                    <datalist id="countries">
                                        {/* Include options here as needed */}
                                    </datalist>
                                </div>
                            )}
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="paymentOptions" value="paypal" id="paypalOption" checked={paymentOption === 'paypal'} onChange={handlePaymentOptionChange} />
                                <label className="form-check-label" htmlFor="paypalOption">PayPal</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="paymentOptions" value="bank" id="bankOption" checked={paymentOption === 'bank'} onChange={handlePaymentOptionChange} />
                                <label className="form-check-label" htmlFor="bankOption">Referência multibanco</label>
                            </div>
                        </div>
                        <button className="btn btn-primary mt-4">Feito</button>
                    </div>
                </div>
            </div>

            <footer className="footer bg-dark text-light text-center p-3">
                <div className="container">
                    <span>&copy; Ware 2024</span>
                </div>
            </footer>
        </div>
    );
};

export default ShopConfirm;
