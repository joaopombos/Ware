import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./tickets.css";

const App = () => {
  const changeStatus = (ticketId, status, statusText) => {
    const ticket = document.getElementById(ticketId);
    const header = ticket.querySelector(".card-header");
    header.className = "card-header bg-" + status + " text-white";
    header.textContent = "Ticket #" + ticketId.replace("ticket", "") + " - " + statusText;
    updateProgress();
  };

  const updateProgress = () => {
    const tickets = document.querySelectorAll(".ticket-card");
    const totalTickets = tickets.length;
    let resolvedCount = 0,
      resolvingCount = 0,
      unresolvedCount = 0;

    tickets.forEach((ticket) => {
      if (ticket.querySelector(".card-header").classList.contains("bg-success")) {
        resolvedCount++;
      } else if (ticket.querySelector(".card-header").classList.contains("bg-warning")) {
        resolvingCount++;
      } else if (ticket.querySelector(".card-header").classList.contains("bg-danger")) {
        unresolvedCount++;
      }
    });

    const resolvedPercentage = (resolvedCount / totalTickets) * 100;
    const resolvingPercentage = (resolvingCount / totalTickets) * 100;
    const unresolvedPercentage = (unresolvedCount / totalTickets) * 100;

    document.getElementById("progress-success").style.width = resolvedPercentage + "%";
    document.getElementById("progress-warning").style.width = resolvingPercentage + "%";
    document.getElementById("progress-danger").style.width = unresolvedPercentage + "%";
  };

  // Initialize the progress bar
  React.useEffect(() => {
    updateProgress();
  }, []);

  return (
    <div className="d-flex">
      <div id="sidebar">
        <div className="logo">
          <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
        </div>
        <ul className="list-unstyled components">
          <li className="active">
            <a href="#">
              <i className="fas fa-ticket-alt"></i> Tickets
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-edit"></i> Atualizar/Editar Software
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-plus"></i> Adicionar Software
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-list"></i> Listar Software
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-file-invoice-dollar"></i> Orçamentos
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-chart-line"></i> Métricas de vendas
            </a>
          </li>
        </ul>
        <div className="logout-button">
          <button className="btn btn-primary">Terminar Sessão</button>
        </div>
      </div>

      <div id="content">
        <h2 style={{ marginBottom: "3%" }}>Tickets</h2>

        <div className="container">
          {/* Alerts Section */}
          <div className="alert-buttons mb-4">
            <button className="btn btn-danger">
              <i className="fas fa-times-circle"></i> Por resolver
            </button>
            <button className="btn btn-warning">
              <i className="fas fa-exclamation-triangle"></i> Em resolução
            </button>
            <button className="btn btn-success">
              <i className="fas fa-check-circle"></i> Resolvido
            </button>
          </div>

          {/* Progress Section */}
          <div className="progress-section mb-4">
            <h4>Progresso</h4>
            <div className="progress mb-2">
              <div id="progress-success" className="progress-bar bg-success" role="progressbar" style={{ width: "0%" }}></div>
            </div>
            <div className="progress mb-2">
              <div id="progress-warning" className="progress-bar bg-warning" role="progressbar" style={{ width: "0%" }}></div>
            </div>
            <div className="progress">
              <div id="progress-danger" className="progress-bar bg-danger" role="progressbar" style={{ width: "0%" }}></div>
            </div>
          </div>

          {/* Tickets Section */}
          <div className="tickets-section">
            <h4>Tickets</h4>
            <div className="card ticket-card" id="ticket1">
              <div className="card-header bg-warning text-white">Ticket #1 - Em resolução</div>
              <div className="card-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <div className="mt-3">
                  <button className="btn btn-danger" onClick={() => changeStatus("ticket1", "danger", "Por resolver")}>
                    <i className="fas fa-times-circle"></i>
                  </button>
                  <button className="btn btn-warning" onClick={() => changeStatus("ticket1", "warning", "Em resolução")}>
                    <i className="fas fa-exclamation-triangle"></i>
                  </button>
                  <button className="btn btn-success" onClick={() => changeStatus("ticket1", "success", "Resolvido")}>
                    <i className="fas fa-check-circle"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card ticket-card" id="ticket2">
              <div className="card-header bg-danger text-white">Ticket #2 - Por resolver</div>
              <div className="card-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <div className="mt-3">
                  <button className="btn btn-danger" onClick={() => changeStatus("ticket2", "danger", "Por resolver")}>
                    <i className="fas fa-times-circle"></i>
                  </button>
                  <button className="btn btn-warning" onClick={() => changeStatus("ticket2", "warning", "Em resolução")}>
                    <i className="fas fa-exclamation-triangle"></i>
                  </button>
                  <button className="btn btn-success" onClick={() => changeStatus("ticket2", "success", "Resolvido")}>
                    <i className="fas fa-check-circle"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card ticket-card" id="ticket3">
              <div className="card-header bg-success text-white">Ticket #3 - Resolvido</div>
              <div className="card-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <div className="mt-3">
                  <button className="btn btn-danger" onClick={() => changeStatus("ticket3", "danger", "Por resolver")}>
                    <i className="fas fa-times-circle"></i>
                  </button>
                  <button className="btn btn-warning" onClick={() => changeStatus("ticket3", "warning", "Em resolução")}>
                    <i className="fas fa-exclamation-triangle"></i>
                  </button>
                  <button className="btn btn-success" onClick={() => changeStatus("ticket3", "success", "Resolvido")}>
                    <i className="fas fa-check-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
