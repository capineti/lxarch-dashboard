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

    useEffect(() => {
        if (loading) return;

        const element = containerRef.current;
        if (!element) return;

        const scroller = element.closest('.layout-main') || window;

        const handleScroll = () => {
            const scrollTop = scroller === window ? window.scrollY : scroller.scrollTop;
            setIsCompact(scrollTop > 50);
        };

        scroller.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => scroller.removeEventListener('scroll', handleScroll);
    }, [loading]);

    if (loading || !analysisData) {
        return <div className="p-10 text-center">Cargando análisis...</div>;
    }

    return (
        <div ref={containerRef} className={`analysis-container ${isCompact ? 'mode-compact' : ''}`}>

            {/* Sticky Wrapper for Header */}
            <div className="sticky-header-wrapper">
                {/* Back Button */}
                <button className="back-btn" onClick={onBack}>
                    ← Volver
                </button>

                {/* Header Split Section */}
                <section className="analysis-header-split">
                    {/* Left Card: Main Info & Phase Bar */}
                    <div className="header-left-card">

                        {/* Collapsible Title Block */}
                        <div className="header-title-block">
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
                                <span className="label">Fecha la llamada</span>
                                <span className="val">{analysisData.date}</span>
                            </div>
                        </div>

                        {/* Progress Bar (Phases) */}
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

                    {/* Right Card: Summary & Status */}
                    <div className="header-right-card">
                        <div className="summary-block">
                            <div className="summary-title-wrapper">
                                <h4>Summary</h4>
                            </div>
                            <div className="big-score">
                                {analysisData.summary.interest} <span className="small">% interés</span>
                            </div>
                            <div className="score-bar-bg">
                                <div className="score-bar-fill" style={{ width: `${analysisData.summary.interest}%` }}></div>
                            </div>
                        </div>

                        {/* Collapsible Status Box */}
                        <div className="status-box-wrapper">
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

            {/* KPI Cards Row - Collapses on scroll */}
            <div className="kpi-collapsible-wrapper">
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

            {/* Diagnosis & Action Section */}
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
        </div>
    );
};
