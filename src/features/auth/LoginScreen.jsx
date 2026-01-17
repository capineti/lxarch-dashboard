import React, { useState } from 'react';
import './LoginScreen.css';
import logo from '../../assets/lxarch-logo.svg';

export const LoginScreen = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Verification Logic
        // Email check: Minimal check if it looks like an email or strictly "caterina" related?
        // User asked for "caterina's email", I will allow any email for now but check password strictly.
        if (!email.includes('@')) {
            setError('Por favor, introduce un email válido.');
            return;
        }

        if (password === '1234') {
            // Success
            onLogin(keepLoggedIn);
        } else {
            setError('La contraseña es incorrecta.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-bg-graphic"></div>

            <div className="login-card">
                <img src={logo} alt="LxArch Logo" className="login-logo" />

                <div className="login-header">
                    <h2>Bienvenido</h2>
                    <p>Accede al panel de control</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="nombre@lxarch.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <label className="remember-me">
                        <input
                            type="checkbox"
                            className="remember-checkbox"
                            checked={keepLoggedIn}
                            onChange={(e) => setKeepLoggedIn(e.target.checked)}
                        />
                        <span className="remember-text">Log in todo el tiempo</span>
                    </label>

                    {error && <div className="error-msg">{error}</div>}

                    <button type="submit" className="login-btn">
                        Iniciar Sesión
                    </button>
                </form>

                <div className="login-footer">
                    &copy; 2026 LxArch Dashboard
                </div>
            </div>
        </div>
    );
};
