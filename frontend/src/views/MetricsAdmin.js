import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './metricsadmin.css';

const Metrics = () => {
  const totalPriceChartRef = useRef(null);
  const averagePriceChartRef = useRef(null);
  const highestPriceChartRef = useRef(null);

  useEffect(() => {
    const orcamentos = [100, 200, 300, 400, 500];

    const totalPrice = orcamentos.reduce((acc, val) => acc + val, 0);
    const averagePrice = (totalPrice / orcamentos.length).toFixed(2);
    const highestPrice = Math.max(...orcamentos);

    const createChart = (ctx, label, data, backgroundColor, borderColor) => {
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [label],
          datasets: [{
            label,
            data: [data],
            backgroundColor,
            borderColor,
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
    };

    if (totalPriceChartRef.current) totalPriceChartRef.current.destroy();
    if (averagePriceChartRef.current) averagePriceChartRef.current.destroy();
    if (highestPriceChartRef.current) highestPriceChartRef.current.destroy();

    totalPriceChartRef.current = createChart(document.getElementById('totalPriceChart'), 'Preço total', totalPrice, 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)');
    averagePriceChartRef.current = createChart(document.getElementById('averagePriceChart'), 'Média de preço', averagePrice, 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 1)');
    highestPriceChartRef.current = createChart(document.getElementById('highestPriceChart'), 'Preço mais alto', highestPrice, 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)');

    return () => {
      if (totalPriceChartRef.current) totalPriceChartRef.current.destroy();
      if (averagePriceChartRef.current) averagePriceChartRef.current.destroy();
      if (highestPriceChartRef.current) highestPriceChartRef.current.destroy();
    };
  }, []);

  return (
    <div className="body-container">
      <div id="sidebar">
        <div className="logo">
          <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
        </div>
        <ul className="components">
          <li>
            <a href="/tickets/admin"><i className="fas fa-ticket-alt"></i> Tickets</a>
          </li>
          <li>
            <a href="/edit/admin"><i className="fas fa-edit"></i> Atualizar/Editar Software</a>
          </li>
          <li>
            <a href="/add/admin"><i className="fas fa-plus"></i> Adicionar Software</a>
          </li>
          <li>
            <a href=""><i className="fas fa-list"></i> Listar Software</a>
          </li>
          <li>
            <a href="#"><i className="fas fa-file-invoice-dollar"></i> Orçamentos</a>
          </li>
          <li className="active">
            <a href="#"><i className="fas fa-chart-line"></i> Métricas de vendas</a>
          </li>
        </ul>
        <div className="logout-button">
        <a href="/home" className="btn btn-primary">Terminar Sessão</a>
        </div>
      </div>

      <div id="content">
        <h2 style={{ marginBottom: '3%' }}>Métricas de vendas</h2>
        <div className="chart-wrapper">
          <div className="chart-container">
            <h5 className="card-title">Preço total</h5>
            <canvas id="totalPriceChart"></canvas>
          </div>
          <div className="chart-container">
            <h5 className="card-title">Média de preço</h5>
            <canvas id="averagePriceChart"></canvas>
          </div>
          <div className="chart-container">
            <h5 className="card-title">Preço mais alto</h5>
            <canvas id="highestPriceChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Metrics;
