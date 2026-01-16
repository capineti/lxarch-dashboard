import { useState, useEffect, useRef } from 'react';
import './AnalysisScreen.css';
import { fetchAnalysis } from '../../services/dataService';

export const AnalysisScreen = ({ agent, onBack }) => {
    const [analysisData, setAnalysisData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCompact, setIsCompact] = useState(false);
    const containerRef = useRef(null);

    // Use passed agent or fallback to local variable for display before data loads
    const currentAgent = agent || { name: 'Sofía Martínez' };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await fetchAnalysis(currentAgent.id);
                setAnalysisData(data);
            } catch (error) {
                console.error("Failed to load analysis", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [currentAgent]);

    // Robust scroll listener
    useEffect(() => {
        if (loading) return;

        const timer = setTimeout(() => {
            const element = containerRef.current;
            let scroller = element?.closest('.layout-main');

            if (!scroller) scroller = document.querySelector('.layout-main');
            if (!scroller) scroller = window;

            const handleScroll = () => {
                const scrollTop = scroller === window ? window.scrollY : scroller.scrollTop;

                // Hysteresis: different thresholds to prevent flickering
                if (scrollTop > 150 && !isCompact) {
                    setIsCompact(true);
                } else if (scrollTop < 100 && isCompact) {
                    setIsCompact(false);
                }
            };

            scroller.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();

            return () => {
                if (scroller) scroller.removeEventListener('scroll', handleScroll);
            };
        }, 100);

        return () => clearTimeout(timer);
    }, [loading, isCompact]); // Include isCompact to enable hysteresis

    if (loading || !analysisData) {
        return <div className="p-10 text-center">Cargando análisis...</div>;
    }

    return (
        <div ref={containerRef} className={`analysis-container ${isCompact ? 'state-compact' : ''}`}>

            {/* Sticky Header Container */}
            <div className="sticky-header-container">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button (Absolute to not affect flow of sticky header if possible or handled via padding) */}
                    <button className="back-btn" onClick={onBack}>
                        ← Volver
                    </button>

                    <section className="analysis-header-split">
                        {/* Left Card */}
                        <div className="header-left-card">
                            {/* Collapsible Title */}
                            <div className="collapsible-header-content">
                                <h2 className="analysis-subtitle">Análisis de venta de {currentAgent.name}</h2>
                                <h1 className="analysis-title">{analysisData.topic}</h1>
                            </div>

                            <div className="meta-grid">
                                <div className="meta-item">
                                    <span className="label">Cliente</span>
                                    <span className="val">{analysisData.client}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="label">Vendedor</span>
                                    <span className="val">{currentAgent.name}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="label">Fecha</span>
                                    <span className="val">{analysisData.date}</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="phases-container">
                                <div className="phases-bar">
                                    <div className="phase-seg blue" style={{ width: '15%' }}></div>
                                    <div className="phase-seg orange" style={{ width: '45%' }}></div>
                                    <div className="phase-seg red" style={{ width: '30%' }}></div>
                                    <div className="phase-seg grey" style={{ width: '10%' }}></div>
                                </div>
                                <div className="phases-legend">
                                    <span className="legend-item blue">Conexión (15%)</span>
                                    <span className="legend-item orange">Análisis (45%)</span>
                                    <span className="legend-item red">Oferta (30%)</span>
                                    <span className="legend-item grey">Cierre (10%)</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className="header-right-card">
                            <div className="collapsible-title">
                                <h4>Summary</h4>
                            </div>

                            <div className="summary-score-wrapper">
                                <div className="big-score">
                                    {analysisData.summary.interest}
                                    <span className="small">% interés</span>
                                </div>
                                <div className="score-bar-bg">
                                    <div className="score-bar-fill" style={{ width: `${analysisData.summary.interest}%` }}></div>
                                </div>
                            </div>

                            <div className="collapsible-status-box">
                                <div className="summary-status-box">
                                    <div className="status-row">
                                        <span>Estado Actual:</span> <span className="status-val">{analysisData.summary.status}</span>
                                    </div>
                                    <div className="next-step-row">
                                        <span className="orange-text">{analysisData.summary.nextStep}</span>
                                        <span className="date-text">{analysisData.summary.nextDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Collapsible KPI Section */}
            <div className="collapsible-kpi-section">
                <section className="kpi-cards-row">
                    {analysisData.kpis.map((kpi, idx) => (
                        <div className="analysis-kpi-card" key={idx}>
                            <h4>{kpi.label}</h4>
                            <div className="kpi-val">{kpi.value}</div>
                            <div className="kpi-bar-bg">
                                <div className="kpi-bar-fill" style={{ width: `${kpi.barValue}%` }}></div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            {/* Diagnosis Section - Always Visible */}
            <section className="diagnosis-section">
                <div className="diagnosis-left">
                    <h3>Diagnostico del agente de ventas</h3>
                    <div className="result-label">
                        Resultado de la llamada
                        <span className="status-tag green">◼ Oportunidad Activa</span>
                    </div>

                    <div className="top-failures-box">
                        <h4 className="tf-title">Top 3 Fallos</h4>
                        <ul className="fail-list">
                            {analysisData.diagnosis.topFailures.map((fail, i) => (
                                <li key={i}>{fail}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="diagnosis-right">
                    <h4>Instrucción para {currentAgent.name}:</h4>
                    <p className="issue-desc">{analysisData.diagnosis.instruction.issue}</p>

                    <div className="action-required-block">
                        <h5>ACCIÓN REQUERIDA</h5>
                        <ol className="action-list">
                            {analysisData.diagnosis.instruction.actions.map((act, i) => (
                                <li key={i}>{act}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Qualitative Analysis Section (New Card) */}
            {analysisData.qualitativeAnalysis && (
                <section className="diagnosis-section qualitative-card">
                    <div className="qualitative-content">
                        <h3>{analysisData.qualitativeAnalysis.title}</h3>

                        <div className="evaluation-list">
                            {analysisData.qualitativeAnalysis.sections.map((sec, i) => (
                                <div key={i} className="eval-item">
                                    <h4 className="eval-title">{sec.title}</h4>
                                    <div className="eval-score">***Puntuación: {sec.score}</div>
                                    <p className="eval-text">{sec.content}</p>
                                </div>
                            ))}
                        </div>

                        <hr className="section-divider" />

                        <h4 className="section-header">✅ FORTALEZAS PRINCIPALES</h4>
                        <ul className="strengths-list">
                            {analysisData.qualitativeAnalysis.strengths.map((str, i) => (
                                <li key={i}>
                                    <strong>{str.title}:</strong> {str.content}
                                </li>
                            ))}
                        </ul>

                        <hr className="section-divider" />

                        <h4 className="section-header">🚀 ÁREAS DE MEJORA (PRIORITARIAS)</h4>
                        <div className="improvements-list">
                            {analysisData.qualitativeAnalysis.improvements.map((imp) => (
                                <div key={imp.id} className="imp-item">
                                    <h5 className="imp-title">{imp.id}. {imp.title}</h5>
                                    <p><strong>❌ Lo que faltó:</strong> {imp.content.missing}</p>
                                    <p><strong>✅ Qué hacer:</strong> {imp.content.todo}</p>
                                    <p><strong>💡 Por qué importa:</strong> {imp.content.why}</p>
                                    <p><strong>🎯 Ejercicio práctico:</strong> {imp.content.exercise}</p>
                                </div>
                            ))}
                        </div>

                        <hr className="section-divider" />

                        <h4 className="section-header">💡 CONCLUSIÓN</h4>
                        <p className="conclusion-text">{analysisData.qualitativeAnalysis.conclusion}</p>
                    </div>
                </section>
            )}

            {/* Spacer for scrolling */}
            <div style={{ height: '20vh' }}></div>
        </div>
    );
};
