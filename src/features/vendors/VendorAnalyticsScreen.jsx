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

    const [selectedWeek, setSelectedWeek] = useState(null);

    const weeksAvailable = [
        {
            id: 3,
            label: 'Semana 3',
            dateRange: '15/01/2026 - 21/01/2026',
            count: 3,
            isCurrent: true,
            stats: { progress: 82.3, opportunities: 2, closed: 1, lost: 0 }
        },
        {
            id: 2,
            label: 'Semana 2',
            dateRange: '08/01/2026 - 14/01/2026',
            count: 6,
            stats: { progress: 75.5, opportunities: 3, closed: 2, lost: 1 }
        },
        {
            id: 1,
            label: 'Semana 1',
            dateRange: '01/01/2026 - 07/01/2026',
            count: 4,
            stats: { progress: 88.0, opportunities: 2, closed: 2, lost: 0 }
        },
    ];

    const [isMonthGridView, setIsMonthGridView] = useState(false);

    // Month data with dynamic status
    // Hardcoded to January (0) as per request "estamos en enero"
    const currentMonthIndex = 0;

    const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const months = monthLabels.map((label, index) => {
        let status = 'future';
        if (index === currentMonthIndex) status = 'active';
        else if (index < currentMonthIndex) status = 'past';

        return {
            id: index,
            label,
            status, // 'active', 'past', 'future'
            disabled: status === 'future'
        };
    });

    const handleMonthSelect = (month) => {
        if (month.disabled) return;
        // Logic to filter weeks by month would go here
        setIsMonthGridView(false);
    };

    // Determine which statistics to show: Active selection or Default (Current Week)
    const displayWeek = selectedWeek || weeksAvailable.find(w => w.isCurrent) || weeksAvailable[0];

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
                {/* Score Card - Expanded */}
                <div className="v-summary-card score-card-expanded">
                    <div>
                        <div className="v-card-title">Puntuación General {displayWeek.label}</div>
                        <div className="score-row">
                            <div className="v-card-value">{displayWeek.stats.progress}%</div>
                            <div className="score-progress-bar">
                                <div
                                    className="score-progress-fill"
                                    style={{ width: `${displayWeek.stats.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="v-card-sub">Basado en las últimas {displayWeek.count} llamadas</div>
                </div>

                {/* Status Cards - 3 Square Cards */}
                <div className="status-cards-group">
                    <div className="v-summary-card square-card">
                        <div className="v-card-title">Oportunidades</div>
                        <div className="v-card-value text-active">
                            {displayWeek.stats.opportunities}
                        </div>
                        <div className="v-card-sub">Activas</div>
                    </div>
                    <div className="v-summary-card square-card">
                        <div className="v-card-title">Cerradas</div>
                        <div className="v-card-value text-closed">
                            {displayWeek.stats.closed}
                        </div>
                        <div className="v-card-sub">Exitosas</div>
                    </div>
                    <div className="v-summary-card square-card">
                        <div className="v-card-title">Perdidas</div>
                        <div className="v-card-value text-lost">
                            {displayWeek.stats.lost}
                        </div>
                        <div className="v-card-sub">Sin éxito</div>
                    </div>
                </div>
            </section>

            {/* Calls History Section */}
            <section className="calls-grid-section">
                <div className="section-header-row">
                    <div className="flex-center-row" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h3>Historial de llamadas 2026</h3>
                        <button
                            className={`grid-toggle-btn ${isMonthGridView ? 'active' : ''}`}
                            onClick={() => setIsMonthGridView(!isMonthGridView)}
                            title="Ver meses"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 3H10V10H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 3H21V10H14V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 14H21V21H14V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 14H10V21H3V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {selectedWeek && !isMonthGridView && (
                        <span className={`report-status-badge ${selectedWeek.isCurrent ? 'status-current' : 'status-sent'}`}>
                            {selectedWeek.isCurrent ? 'INFORME EJECUTIVO EN CURSO' : 'INFORME EJECUTIVO ENVIADO'}
                        </span>
                    )}
                </div>

                {/* Back to Weeks Breadcrumb (only if week selected AND not in grid view) */}
                {selectedWeek && !isMonthGridView && (
                    <div className="week-breadcrumb" onClick={() => setSelectedWeek(null)}>
                        <span>Todas las semanas</span>
                        <span className="separator">/</span>
                        <span className="current">{selectedWeek.label}</span>
                    </div>
                )}

                {/* Main Content Area */}
                {loading ? (
                    <div className="loading-state">Cargando datos...</div>
                ) : (
                    <>
                        {isMonthGridView ? (
                            <div className="months-grid-view">
                                {months.map(month => (
                                    <div
                                        key={month.id}
                                        className={`month-card ${month.status === 'active' ? 'active' : ''} ${month.status === 'past' ? 'past' : ''} ${month.status === 'future' ? 'disabled' : ''}`}
                                        onClick={() => handleMonthSelect(month)}
                                    >
                                        <span className="month-label">{month.label}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                {/* Week List View */}
                                {!selectedWeek && (
                                    <div className="weeks-list">
                                        {weeksAvailable.map(week => (
                                            <div
                                                key={week.id}
                                                className={`week-row ${week.isCurrent ? 'current-week' : ''}`}
                                                onClick={() => setSelectedWeek(week)}
                                            >
                                                <div className="week-info">
                                                    <span className="week-label">{week.label}</span>
                                                    <span className="week-date">{week.dateRange}</span>
                                                </div>
                                                <div className="week-meta">
                                                    <span className="week-count">{week.count} llamadas</span>
                                                    <span className="week-arrow">→</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Calls Grid View (Shown when week selected) */}
                                {selectedWeek && (
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
                            </>
                        )}
                    </>
                )}
            </section>
        </div >
    );
};
