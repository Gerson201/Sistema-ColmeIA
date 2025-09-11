import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataCard from './components/DataCard';

import HistoricalGraphModal from './components/HistoricalGraphModal';
import beehiveIcon from './assets/images/Icone de Colmeia.png'; // New import

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || `http://${window.location.hostname}:8000`;
const API_URL = API_BASE_URL + '/api/data/';

// This function will parse the semicolon-separated string into an object
const parseReadingString = (str) => {
    const reading = {};
    if (!str || typeof str !== 'string') return null;
    

    try {
        const pairs = str.split(';');
        pairs.forEach(pair => {
            const parts = pair.split(':');
            if (parts.length === 2) {
                // Sanitize key to remove potential weird characters
                const key = parts[0].replace(/[^a-zA-Z]/g, "").trim();
                const value = parseFloat(parts[1]);
                
                if (key && !isNaN(value)) {
                    reading[key] = value;
                } else if (key) {
                    reading[key] = parts[1]; // Keep as string if not a number
                }
            }
        });
        return Object.keys(reading).length > 0 ? reading : null;
    } catch (error) {
        console.error("Error parsing string:", str, error);
        return null; // Return null if parsing fails
    }
};

// Determines the status color based on value
const getStatus = (key, value) => {
    if (value === null || value === undefined) return 'good';
    switch (key) {
        case 'Temp':
            if (value > 40 || value < 10) return 'danger';
            if (value > 36 || value < 15) return 'warning';
            return 'good';
        case 'Hum':
            if (value > 80 || value < 40) return 'danger';
            if (value > 70 || value < 50) return 'warning';
            return 'good';
        case 'Peso':
            if (value < 10 && value > 0) return 'warning'; // only if weight is positive but low
            return 'good';
        default:
            return 'good';
    }
};


const variableNamesMap = {
    'Temp': 'Temperatura',
    'Hum': 'Umidade',
    'Peso': 'Peso',
    'Freq': 'Frequência',
    'Mag': 'Magnitude Acústica',
    'ID': 'ID do Equipamento',
};

const Dashboard = ({ user, onLogout }) => {
    const [latestReading, setLatestReading] = useState(null);
    const [error, setError] = useState(null);
    const [showGraphModal, setShowGraphModal] = useState(false);
    const [selectedVariable, setSelectedVariable] = useState(null);
    const [selectedVariableFullName, setSelectedVariableFullName] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL, {
                    headers: token ? { 'Authorization': `Token ${token}` } : {}
                });
                const data = response.data;

                if (!data || !data.leituras_esp32) {
                    throw new Error("Formato de dados da API incorreto");
                }

                const readingsByDevice = data.leituras_esp32;
                
                const deviceIds = Object.keys(readingsByDevice);
                if (deviceIds.length === 0) {
                    setLatestReading(null);
                    setError("Nenhum dado de leitura disponível.");
                    return;
                }

                // Find the most recent entry across all devices
                let mostRecentEntry = null;
                let mostRecentTimestamp = 0;

                deviceIds.forEach(deviceId => {
                    const entry = readingsByDevice[deviceId];
                    // Assuming the timestamp is stored as a Unix timestamp (number)
                    const entryTimestamp = new Date(entry.timestamp).getTime();
                    if (entryTimestamp > mostRecentTimestamp) {
                        mostRecentTimestamp = entryTimestamp;
                        mostRecentEntry = entry;
                    }
                });

                if (mostRecentEntry && mostRecentEntry.leituras && mostRecentEntry.leituras.length > 0) {
                    // Get the last reading string from the most recent entry
                    const latestReadingString = mostRecentEntry.leituras[mostRecentEntry.leituras.length - 1];
                    const parsedReading = parseReadingString(latestReadingString);
                    
                    if(parsedReading) {
                        setLatestReading(parsedReading);
                    } else {
                        setError("Não foi possível analisar a leitura mais recente.");
                    }
                } else {
                    setError("Nenhuma leitura válida encontrada na entrada mais recente.");
                }
                setError(null); // Clear previous errors if successful
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(`Erro no processamento: ${err.message}. Verifique o console para detalhes.`);
            }
        };

        fetchData(); // Initial fetch
        const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    

    const handleCardClick = (variableKey) => {
        setSelectedVariable(variableKey);
        setSelectedVariableFullName(variableNamesMap[variableKey] || variableKey);
        setShowGraphModal(true);
    };

    const handleCloseGraphModal = () => {
        setShowGraphModal(false);
        setSelectedVariable(null);
        setSelectedVariableFullName(null);
    };

    const renderCard = (key, title, unit) => {
        const value = latestReading ? latestReading[key] : null;
        const cardOnClick = (key === 'ID') ? undefined : () => handleCardClick(key);

        return (
            <DataCard
                title={title}
                value={value}
                unit={unit}
                status={getStatus(key, value)}
                onClick={cardOnClick}
            />
        );
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                {/* Left side: Current Equipment ID Display */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '8px 15px',
                    backgroundColor: '#28a745', // Green color
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '1rem'
                }}>
                    <img src={beehiveIcon} alt="Beehive Icon" style={{ width: '20px', height: '20px' }} />
                    Equipamento: {latestReading?.ID || '---'}
                </div>

                {/* Center: Dashboard Title */}
                <h1 className="dashboard-title" style={{ margin: 0, flexGrow: 1, textAlign: 'center', fontSize: '2rem' }}>Dashboard Colmeia</h1>

                {/* Right side: Logout Button */}
                <button onClick={onLogout} style={{
                    padding: '8px 15px',
                    backgroundColor: '#dc3545', // Red color for logout
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                }}>Sair</button>
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <div className="dashboard">
                {renderCard('Temp', 'Temperatura na Colmeia', '°C')}
                {renderCard('Hum', 'Umidade na Colmeia', '%')}
                {renderCard('Temp', 'Temperatura Externa', '°C')}
                {renderCard('Hum', 'Umidade Externa', '%')}
                {renderCard('Peso', 'Peso', 'kg')}
                {renderCard('Freq', 'Frequência', 'Hz')}
                {renderCard('Mag', 'Magnitude Acústica', 'dB')}
                {renderCard('ID', 'ID do Equipamento', '')}
            </div> {/* End of dashboard div */}

            {/* Resumo de Status das Variáveis */}
            <div style={{ marginBottom: '30px', padding: '0 20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white', fontSize: '2rem' }}>Resumo de Status</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {/* Card Verde - Variáveis Boas */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        borderTop: `5px solid #28a745`
                    }}>
                        <h3 style={{ margin: '0 0 15px 0', color: '#28a745', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '12px', height: '12px', backgroundColor: '#28a745', borderRadius: '50%' }}></span>
                            Bom Estado
                        </h3>
                        <div style={{ fontSize: '1rem', color: '#333' }}>
                            {['Temp', 'Hum', 'Peso', 'Freq', 'Mag'].filter(variable => getStatus(variable, latestReading?.[variable]) === 'good').length > 0 ? (
                                ['Temp', 'Hum', 'Peso', 'Freq', 'Mag'].filter(variable => getStatus(variable, latestReading?.[variable]) === 'good').map(variable => (
                                    <div key={variable} style={{ marginBottom: '8px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                                        <strong>{variableNamesMap[variable]}:</strong> {latestReading?.[variable] || '---'}
                                    </div>
                                ))
                            ) : (
                                <div style={{ color: '#666', fontStyle: 'italic' }}>Nenhuma variável em bom estado</div>
                            )}
                        </div>
                    </div>

                    {/* Card Amarelo - Variáveis em Alerta */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        borderTop: `5px solid #ffc107`
                    }}>
                        <h3 style={{ margin: '0 0 15px 0', color: '#ffc107', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '12px', height: '12px', backgroundColor: '#ffc107', borderRadius: '50%' }}></span>
                            Alerta
                        </h3>
                        <div style={{ fontSize: '1rem', color: '#333' }}>
                            {['Temp', 'Hum', 'Peso', 'Freq', 'Mag'].filter(variable => getStatus(variable, latestReading?.[variable]) === 'warning').length > 0 ? (
                                ['Temp', 'Hum', 'Peso', 'Freq', 'Mag'].filter(variable => getStatus(variable, latestReading?.[variable]) === 'warning').map(variable => (
                                    <div key={variable} style={{ marginBottom: '8px', padding: '8px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
                                        <strong>{variableNamesMap[variable]}:</strong> {latestReading?.[variable] || '---'}
                                    </div>
                                ))
                            ) : (
                                <div style={{ color: '#666', fontStyle: 'italic' }}>Nenhuma variável em alerta</div>
                            )}
                        </div>
                    </div>

                    {/* Card Vermelho - Variáveis em Perigo */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        borderTop: `5px solid #dc3545`
                    }}>
                        <h3 style={{ margin: '0 0 15px 0', color: '#dc3545', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '12px', height: '12px', backgroundColor: '#dc3545', borderRadius: '50%' }}></span>
                            Perigo
                        </h3>
                        <div style={{ fontSize: '1rem', color: '#333' }}>
                            {['Temp', 'Hum', 'Peso', 'Freq', 'Mag'].filter(variable => getStatus(variable, latestReading?.[variable]) === 'danger').length > 0 ? (
                                ['Temp', 'Hum', 'Peso', 'Freq', 'Mag'].filter(variable => getStatus(variable, latestReading?.[variable]) === 'danger').map(variable => (
                                    <div key={variable} style={{ marginBottom: '8px', padding: '8px', backgroundColor: '#f8d7da', borderRadius: '5px' }}>
                                        <strong>{variableNamesMap[variable]}:</strong> {latestReading?.[variable] || '---'}
                                    </div>
                                ))
                            ) : (
                                <div style={{ color: '#666', fontStyle: 'italic' }}>Nenhuma variável em perigo</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            

            

            

            {showGraphModal && selectedVariable && (
                <HistoricalGraphModal
                    variable={selectedVariable}
                    variableFullName={selectedVariableFullName}
                    onClose={handleCloseGraphModal}
                />
            )}
        </div>
    );
};

export default Dashboard;
