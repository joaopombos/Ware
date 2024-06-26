import React, { useState } from 'react';
import axios from 'axios';  // Importar o axios corretamente
import { useNavigate } from 'react-router-dom';  // Importar o useNavigate para redirecionamento
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function EditComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Instanciar o useNavigate para redirecionamento

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login/admin', { username, password }, {
        withCredentials: true // Se necessário
      });
      const { token } = response.data;
      console.log('Login successful', token);

      // Armazenar o token no localStorage
      localStorage.setItem('token', token);

      // Redirecionar para a página desejada após o login
      navigate('/list/admin');
    } catch (error) {
      console.error('Login error', error);
      if (error.response && error.response.data) {
        setError(error.response.data.error || 'An unexpected error occurred');
      } else if (error.message === 'Network Error') {
        setError('Erro de rede. Verifique sua conexão ou tente novamente mais tarde.');
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
                    <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in Admin</h3>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form2Example17"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form2Example17">Nome do Utilizador</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form2Example27"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form2Example27">Password</label>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="pt-1 mb-4">
                      <button className="btn btn-info btn-lg btn-dark" type="submit" >Login</button>
                    </div>
                    <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Esqueceu-se do código?</a></p>
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
