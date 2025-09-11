import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || `http://${window.location.hostname}:8000`;
const HISTORICAL_API_URL = API_BASE_URL + '/api/history/';

const HistoricalGraphModal = ({ variable, variableFullName, onClose }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${HISTORICAL_API_URL}?variable=${variable}`, {
          headers: token ? { 'Authorization': `Token ${token}` } : {}
        });
        const processedData = response.data;

        if (processedData) {
          setChartData({
            labels: processedData.map(item => item.label),
            datasets: [
              {
                label: `${variableFullName} (Mediana por Bloco)`,
                data: processedData.map(item => item.value),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
            ],
          });
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching historical data:", err);
        setError(`Erro ao carregar histórico para ${variableFullName}: ${err.message}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [variable, variableFullName]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Histórico de ${variableFullName}`,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Bloco de Leituras',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Valor da Mediana',
        },
      },
    },
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <h2>Histórico de {variableFullName}</h2>
        </div>
        {loading && <p>Carregando dados...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (!chartData.datasets[0] || chartData.datasets[0].data.length === 0) && (
          <p>Nenhum dado histórico encontrado para {variableFullName}.</p>
        )}
        {!loading && !error && chartData.datasets[0] && chartData.datasets[0].data.length > 0 && (
          <div className="graph-container">
            <Line data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricalGraphModal;