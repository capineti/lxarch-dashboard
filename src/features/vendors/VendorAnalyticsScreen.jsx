import { useState, useEffect } from 'react';
import './VendorAnalyticsScreen.css';
import { fetchVendorCalls } from '../../services/dataService';

export const VendorAnalyticsScreen = ({ agent, onBack, onSelectCall }) => {
    const [calls, setCalls] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fallback if no agent passed (dev mode)
    const currentAgent = agent || { name: 'Sofía Martínez', progress: 82.3 };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchVendorCalls(currentAgent.id);
                setCalls(data);
            } catch (error) {
                console.error("Failed to load calls", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [currentAgent]);

    const getScoreClass = (score) => {
        if (score >= 80) return 'score-high';
        if (score >= 60) return 'score-med';
        return 'score-low';
    };

    return (
        <div className="vendor-screen-container">
            {/* Header */}
            <header className="vendor-header-block">
                <button className="vs-back-btn" onClick={onBack}>
                    ← Volver al equipo
                </button>
                <div className="vendor-header">
                    <div className="vendor-info-block">
                        <h1>Dashboard de {currentAgent.name}</h1>
                        <p>Resumen de rendimiento y llamadas recientes</p>
                    </div>
                </div>
            </header>

            {/* Top Black Cards */}
            <section className="vendor-summary-cards">
                <div className="v-summary-card">
                    <div>
                        <div className="v-card-title">Puntaje General</div>
                        <div className="v-card-value">{currentAgent.progress}%</div>
                    </div>
                    <div className="v-card-sub">Basado en las últimas 12 llamadas</div>
                </div>
                <div className="v-summary-card">
                    <div>
                        <div className="v-card-title">Oportunidades Activas</div>
                        <div className="v-card-value">8</div>
                    </div>
                    <div className="v-card-sub">2 Cierres previstos esta semana</div>
                </div>
            </section>

            {/* Calls Grid */}
            <section className="calls-grid-section">
                <h3>Historial de Llamadas</h3>
                {loading ? (
                    <div>Cargando llamadas...</div>
                ) : (
                    <div className="calls-grid">
                        {calls.map(call => {
                            const isDarkVariant = call.status === 'Cerrado' || call.status === 'Perdido';
                            return (
                                <div
                                    key={call.id}
                                    className={`call-card ${isDarkVariant ? 'dark-variant' : ''}`}
                                    onClick={() => onSelectCall(call)}
                                >
                                    <div className="call-header">
                                        <span className="client-name">{call.client}</span>
                                        <span className={`call-score-badge ${getScoreClass(call.score)}`}>
                                            {call.score}%
                                        </span>
                                    </div>
                                    <div className="call-date">{call.date}</div>

                                    <div className="call-details">
                                        <div className="cd-row">
                                            <span className="cd-label">Estado:</span>
                                            <span className="cd-val">{call.status}</span>
                                        </div>
                                        <div className="cd-row">
                                            <span className="cd-label">Próx. Reunión:</span>
                                            <span className="cd-val">{call.nextMeeting}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
};
