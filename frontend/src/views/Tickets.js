import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./tickets.css";

const App = () => {
  const [visibleBodies, setVisibleBodies] = useState({});

  const toggleBodyVisibility = (ticketId) => {
    setVisibleBodies((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };

  const changeStatus = (ticketId, status, statusText) => {
    const ticket = document.getElementById(ticketId);
    const header = ticket.querySelector(".card-header");
    header.class = "card-header bg-" + status + " text-white";
    header.textContent = "Ticket #" + ticketId.replace("ticket", "") + " - " + statusText;
    updateProgress();
  };

  const updateProgress = () => {
    const tickets = document.querySelectorAll(".card.ticket-card");
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

  React.useEffect(() => {
    updateProgress();
  }, []);

  return (
    <div class="d-flex">
      <div id="sidebar">
        <div class="logo">
          <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
        </div>
        <ul class="list-unstyled components">
          <li class="active">
            <a href="/tickets/admin">
              <i class="fas fa-ticket-alt"></i> Tickets
            </a>
          </li>
          <li>
            <a href="/edit/admin">
              <i class="fas fa-edit"></i> Atualizar/Editar Software
            </a>
          </li>
          <li>
            <a href="/add/admin">
              <i class="fas fa-plus"></i> Adicionar Software
            </a>
          </li>
          <li>
            <a href="/list/admin">
              <i class="fas fa-list"></i> Listar Software
            </a>
          </li>
          <li>
            <a href="/budget/admin">
              <i class="fas fa-file-invoice-dollar"></i> Orçamentos
            </a>
          </li>
          <li>
            <a href="/metrics/admin/">
              <i class="fas fa-chart-line"></i> Métricas de vendas
            </a>
          </li>
        </ul>
        <div class="logout-button">
        <a href="/home" class="btn btn-primary">Terminar Sessão</a>

        </div>
      </div>

      <div id="content">
        <h2 style={{ marginBottom: "3%" }}>Tickets</h2>

        <div class="section-container">
          <h4>Alerts</h4>
          <div class="alert-buttons">
            <button class="btn btn-danger">
              <i class="fas fa-times-circle"></i> Por resolver
            </button>
            <button class="btn btn-warning">
              <i class="fas fa-exclamation-triangle"></i> Em resolução
            </button>
            <button class="btn btn-success">
              <i class="fas fa-check-circle"></i> Resolvido
            </button>
          </div>
        </div>

        <div class="section-container">
          <h4>Progresso</h4>
          <div class="progress-section">
            <div class="progress mb-2">
              <div id="progress-success" class="progress-bar bg-success" role="progressbar" style={{ width: "0%" }}></div>
            </div>
            <div class="progress mb-2">
              <div id="progress-warning" class="progress-bar bg-warning" role="progressbar" style={{ width: "0%" }}></div>
            </div>
            <div class="progress">
              <div id="progress-danger" class="progress-bar bg-danger" role="progressbar" style={{ width: "0%" }}></div>
            </div>
          </div>
        </div>

        <div class="section-container">
          <h4>Tickets</h4>
          <div class="tickets-section">
            <div class="card ticket-card" id="ticket1">
              <div
                class="card-header bg-warning text-white"
                onClick={() => toggleBodyVisibility("ticket1")}
                style={{ cursor: "pointer" }}
              >
                Ticket #1 - Em resolução
              </div>
              {visibleBodies["ticket1"] && (
                <div class="card-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  <div class="mt-3">
                    <button class="btn btn-danger" onClick={() => changeStatus("ticket1", "danger", "Por resolver")}>
                      <i class="fas fa-times-circle"></i>
                    </button>
                    <button class="btn btn-warning" onClick={() => changeStatus("ticket1", "warning", "Em resolução")}>
                      <i class="fas fa-exclamation-triangle"></i>
                    </button>
                    <button class="btn btn-success" onClick={() => changeStatus("ticket1", "success", "Resolvido")}>
                      <i class="fas fa-check-circle"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div class="card ticket-card" id="ticket2">
              <div
                class="card-header bg-danger text-white"
                onClick={() => toggleBodyVisibility("ticket2")}
                style={{ cursor: "pointer" }}
              >
                Ticket #2 - Por resolver
              </div>
              {visibleBodies["ticket2"] && (
                <div class="card-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  <div class="mt-3">
                    <button class="btn btn-danger" onClick={() => changeStatus("ticket2", "danger", "Por resolver")}>
                      <i class="fas fa-times-circle"></i>
                    </button>
                    <button class="btn btn-warning" onClick={() => changeStatus("ticket2", "warning", "Em resolução")}>
                      <i class="fas fa-exclamation-triangle"></i>
                    </button>
                    <button class="btn btn-success" onClick={() => changeStatus("ticket2", "success", "Resolvido")}>
                      <i class="fas fa-check-circle"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div class="card ticket-card" id="ticket3">
              <div
                class="card-header bg-success text-white"
                onClick={() => toggleBodyVisibility("ticket3")}
                style={{ cursor: "pointer" }}
              >
                Ticket #3 - Resolvido
              </div>
              {visibleBodies["ticket3"] && (
                <div class="card-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  <div class="mt-3">
                    <button class="btn btn-danger" onClick={() => changeStatus("ticket3", "danger", "Por resolver")}>
                      <i class="fas fa-times-circle"></i>
                    </button>
                    <button class="btn btn-warning" onClick={() => changeStatus("ticket3", "warning", "Em resolução")}>
                      <i class="fas fa-exclamation-triangle"></i>
                    </button>
                    <button class="btn btn-success" onClick={() => changeStatus("ticket3", "success", "Resolvido")}>
                      <i class="fas fa-check-circle"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
