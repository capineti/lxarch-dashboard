import { useState, useEffect } from 'react';
import './AgentGridScreen.css';
import { fetchAgents } from '../../services/dataService';

const AgentCard = ({ agent, onClick }) => {
    return (
        <div className="agent-card" onClick={onClick}>
            <div className="agent-header">
                <img src={agent.image} alt={agent.name} className="agent-avatar" />
                <div className="agent-title">
                    <span className="agent-name">{agent.name}</span>
                    <div className="agent-score">
                        <span className="score-value">{agent.progress} %</span>
                    </div>
                </div>
            </div>

            <div className="progress-container">
                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{ width: `${agent.progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="agent-footer">
                <div className="status-row">
                    <span className="status-label">Estado Actual:</span>
                    <span className="status-val">{agent.status}</span>
                </div>
                <div className="next-action-row">
                    <span className="action-label">Próximo seguimiento</span>
                    <span className="action-val">{agent.nextFollowUp}</span>
                </div>
            </div>
        </div>
    );
};

export const AgentGridScreen = ({ onAgentSelect }) => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAgents();
                setAgents(data);
            } catch (error) {
                console.error("Failed to load agents", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="p-10 text-center">Cargando equipo...</div>;
    }

    return (
        <div className="agent-screen-container">
            {/* Hero Section */}
            <section className="dashboard-hero">
                <div className="hero-text">
                    <h1>Hola, Caterina!</h1>
                    <p>Aquí tienes las métricas de tus vendedores</p>
                </div>
                <div className="hero-gauge-card">
                    {/* Simplified CSS Gauge Mockup */}
                    <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '20px' }}>
                        <svg width="400" height="220" viewBox="0 0 400 220" style={{ overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#fbbf24" />
                                    <stop offset="100%" stopColor="#ea580c" />
                                </linearGradient>
                            </defs>

                            {/* Dark Gray Background Semicircle Track */}
                            <path
                                d="M 40 200 A 160 160 0 0 1 360 200"
                                fill="none"
                                stroke="var(--gauge-track)"
                                strokeWidth="45"
                                strokeLinecap="butt"
                            />

                            {/* Generated Ticks */}
                            {Array.from({ length: 60 }).map((_, i) => {
                                const totalTicks = 60;
                                const currentPercentage = 75; // Reverted to real value logic
                                const tickPercentage = (i / (totalTicks - 1)) * 100;

                                if (tickPercentage > currentPercentage) return null;

                                const angle = 180 + (i / (totalTicks - 1)) * 180; // 180 to 360

                                // Calculate variable thickness: starts at 2px, ends at 6px
                                const thickness = 2 + (i / totalTicks) * 5;

                                // Polar to Cartesian
                                const radiusInner = 145;
                                const radiusOuter = 175; // 30px length
                                const rad = (angle * Math.PI) / 180;

                                const x1 = 200 + radiusInner * Math.cos(rad);
                                const y1 = 200 + radiusInner * Math.sin(rad);
                                const x2 = 200 + radiusOuter * Math.cos(rad);
                                const y2 = 200 + radiusOuter * Math.sin(rad);

                                return (
                                    <line
                                        key={i}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke="url(#gaugeGradient)"
                                        strokeWidth={thickness}
                                        strokeLinecap="round"
                                    />
                                );
                            })}

                            {/* Labels - positioned accurately on the arc (Radius ~190) */}
                            <g className="gauge-labels" style={{ fontSize: '12px', fill: 'var(--text-muted)', fontWeight: '500' }}>
                                <text x="15" y="200" textAnchor="end">0%</text>
                                <text x="200" y="15" textAnchor="middle">50%</text>
                                <text x="385" y="200" textAnchor="start">100%</text>
                            </g>
                        </svg>

                        {/* Center Text */}
                        <div style={{ position: 'absolute', bottom: '8px', textAlign: 'center', width: '100%' }}>
                            <div style={{ fontSize: '4.5rem', lineHeight: '0.8', fontWeight: '300', color: 'var(--text-main)', letterSpacing: '-2px' }}>
                                75<span style={{ fontSize: '2rem' }}>%</span>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '5px' }}>Media del equipo</div>
                            <div style={{
                                fontSize: '2.5rem',
                                color: 'var(--text-main)',
                                fontWeight: '300',
                                marginTop: '0px',
                                textTransform: 'capitalize'
                            }}>
                                {new Date().toLocaleString('es-ES', { month: 'long' })}
                            </div>
                        </div>


                    </div>
                </div>
            </section>

            {/* Grid */}
            <div className="agents-grid">
                {agents.map(agent => (
                    <AgentCard key={agent.id} agent={agent} onClick={() => onAgentSelect(agent)} />
                ))}
            </div>
        </div>
    );
};
