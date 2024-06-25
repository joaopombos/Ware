import axios from 'axios';
import React, { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function EditComponent() {
  const [email, setEmail] = useState('');
  const [codigopessoal, setCodigoPessoal] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', { email, codigopessoal });
      const { token } = response.data;
      // Save token to local storage or cookies as needed
      console.log('Login successful', token);
      // Redirect to another page or perform additional actions
      window.location.href = '/home'; // Redirect to home page after login
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
    <div className="loginpage" style={{ overflow: 'hidden' }}>
      {/* MENU BAR */}
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/"><img src="images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {/* Aqui você pode adicionar itens de menu se necessário */}
          </div>
          <button className="btn btn-outline-light me-2" type="button">Iniciar Sessão</button>
        </div>
      </nav>
      {/* FIM MENU BAR */}

      {/* LOG IN FORM */}
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <section className="d-flex align-items-center justify-content-center" style={{ height: '100vh', overflow: 'hidden' }}>
          <div className="container-fluid" style={{ height: '100vh', overflow: 'hidden' }}>
            <div className="row" style={{ height: '100vh', overflow: 'hidden' }}>
              <div className="col-sm-6 text-black" style={{ height: '100vh', overflow: 'hidden' }}>
                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  <form style={{ width: '23rem', marginTop: '20%' }} onSubmit={handleLogin}>
                    <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form2Example17"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form2Example17">Endereço de email</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form2Example27"
                        className="form-control form-control-lg"
                        value={codigopessoal}
                        onChange={(e) => setCodigoPessoal(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form2Example27">Código</label>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="pt-1 mb-4">
                      <button className="btn btn-info btn-lg btn-dark" type="submit">Login</button>
                    </div>
                    <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Esqueceu-se do código?</a></p>
                    <p>Não tem conta? <a href="/signin/tipo" className="link-info">Crie uma aqui.</a></p>
                  </form>
                </div>
              </div>
              <div className="col-sm-6 d-flex align-items-center justify-content-center" style={{ padding: 0, margin: 0 }}>
                <img src="images/fundos/fundo branco.jpg" alt="image" style={{ width: 'auto', height: '100vh', objectFit: 'cover' }} />
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
