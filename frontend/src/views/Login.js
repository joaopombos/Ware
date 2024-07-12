import axios from 'axios';
import React, { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../CSS/ware.css';
import Cookies from 'js-cookie'; 

export default function EditComponent() {
    const [email, setEmail] = useState('');
    const [codigopessoal, setCodigoPessoal] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login', { email, codigopessoal }, { withCredentials: true });
            const { token, emp_nif } = response.data;
            
            localStorage.setItem('token', token); 
            Cookies.set('emp_nif', emp_nif, { expires: 1, path: '/' }); 
            console.log('Login successful', token);
            window.location.href = '/signup/comprador';
        } catch (error) {
            console.error('Login error', error);
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="loginpage">
            {/* MENU BAR */}
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><img className="warelogo" src="images/Logos/logo.png" alt="Ware Logo" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    </div>
                    <button className="btn btn-outline-light me-2" type="button">Iniciar Sessão</button>
                </div>
            </nav>
            {/* FIM MENU BAR */}

            {/* LOG IN FORM */}
            <div className="logform">
                <section className="d-flex align-items-center justify-content-center">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6 text-black">
                                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                    <form className="actform" onSubmit={handleLogin}>
                                        <h3 className="fw-normal mb-3 pb-3">Log in</h3>
                                        <div className="form-outline mb-4">
                                            <input className="form-control form-control-lg" type="email" id="form2Example17" value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <label className="form-label" htmlFor="form2Example17">Endereço de email</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input className="form-control form-control-lg" type="password" id="form2Example27" value={codigopessoal}
                                                onChange={(e) => setCodigoPessoal(e.target.value)}
                                            />
                                            <label className="form-label" htmlFor="form2Example27">Código</label>
                                        </div>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="pt-1 mb-4">
                                            <button className="btn btn-info btn-lg btn-dark" type="submit">Login</button>
                                        </div>
                                        <p className="small mb-5 pb-lg-2"><a className="text-muted" href="/loginAdmin">Tem Conta Admin?</a></p>
                                        <p>Não tem conta? <a href="/signin/tipo" className="link-info">Crie uma aqui.</a></p>
                                    </form>
                                </div>
                            </div>
                            <div className="col-sm-6 d-flex align-items-center justify-content-center">
                                <img className="sideimg" src="images/fundos/fundo branco.jpg" alt="image" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* FIM LOG IN FORM */}

            {/* FOOTER */}
            <footer className="footer bg-dark text-light fixed-bottom">
                <div className="container d-flex justify-content-center align-items-center">
                    <span className="text-center">&copy; Ware 2024</span>
                </div>
            </footer>
            {/* FIM FOOTER */}
        </div>
    );
}
