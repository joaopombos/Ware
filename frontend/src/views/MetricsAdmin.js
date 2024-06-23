// Metrics.js

import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './metricsadmin.css'; // Import the separated CSS file

const Metrics = () => {
  useEffect(() => {
    const orcamentos = [100, 200, 300, 400, 500]; // Example data, replace with actual data

    const totalPrice = orcamentos.reduce((acc, val) => acc + val, 0);
    const averagePrice = (totalPrice / orcamentos.length).toFixed(2);
    const highestPrice = Math.max(...orcamentos);

    const ctxTotalPrice = document.getElementById('totalPriceChart');
    const ctxAveragePrice = document.getElementById('averagePriceChart');
    const ctxHighestPrice = document.getElementById('highestPriceChart');

    new Chart(ctxTotalPrice, {
      type: 'bar',
      data: {
        labels: ['Preço total'],
        datasets: [{
          label: 'Preço total',
          data: [totalPrice],
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(ctxAveragePrice, {
      type: 'bar',
      data: {
        labels: ['Média de preço'],
        datasets: [{
          label: 'Média de preço',
          data: [averagePrice],
          backgroundColor: ['rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(ctxHighestPrice, {
      type: 'bar',
      data: {
        labels: ['Preço mais alto'],
        datasets: [{
          label: 'Preço mais alto',
          data: [highestPrice],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div id="sidebar" className="col-md-3">
          <div className="logo">
            <img src="frontend/public/images/Logos/logotipo copy.svg" alt="Logo" />
          </div>
          <ul className="list-unstyled components">
            <li>
              <a href="#"><i className="fas fa-ticket-alt"></i> Tickets</a>
            </li>
            <li>
              <a href="#"><i className="fas fa-edit"></i> Atualizar/Editar Software</a>
            </li>
            <li>
              <a href="#"><i className="fas fa-plus"></i> Adicionar Software</a>
            </li>
            <li>
              <a href="#"><i className="fas fa-list"></i> Listar Software</a>
            </li>
            <li>
              <a href="#"><i className="fas fa-file-invoice-dollar"></i> Orçamentos</a>
            </li>
            <li className="active">
              <a href="#"><i className="fas fa-chart-line"></i> Métricas de vendas</a>
            </li>
          </ul>
          <div className="logout-button">
            <button className="btn btn-primary">Terminar Sessão</button>
          </div>
        </div>

        <div id="content" className="col-md-9">
          <h2 style={{ marginBottom: '3%' }}>Métricas de vendas</h2>

          <div className="row">
            <div className="col-md-4">
              <div className="card widget">
                <div className="card-body">
                  <h5 className="card-title">Preço total</h5>
                  <div className="chart-container">
                    <canvas id="totalPriceChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card widget">
                <div className="card-body">
                  <h5 className="card-title">Média de preço</h5>
                  <div className="chart-container">
                    <canvas id="averagePriceChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card widget">
                <div className="card-body">
                  <h5 className="card-title">Preço mais alto</h5>
                  <div className="chart-container">
                    <canvas id="highestPriceChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Metrics;
