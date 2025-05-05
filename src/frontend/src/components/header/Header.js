import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header({ messages }) {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const navbarBurgers = document.querySelectorAll('.navbar-burger');
        navbarBurgers.forEach((burger) => {
            burger.addEventListener('click', () => {
                const target = burger.dataset.target;
                const targetElement = document.getElementById(target);

                burger.classList.toggle('is-active');
                if (targetElement) targetElement.classList.toggle('is-active');
            });
        });

        return () => {
            navbarBurgers.forEach((burger) => {
                burger.removeEventListener('click', () => {});
            });
        };
    }, []);

    const handleLogout = async () => {
        await logout(); 
        navigate('/');
    };

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    return (
        <>
            <nav className="navbar is-light navbar-height" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar__logo" href="/">
                        <img src="cruise-logo.png" width="60" height="60" alt="Cruise Logo" />
                    </a>
                    <div className="flex items-center gap-4">
                        <span className="text-sm">☀️</span>
                        <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                            isDarkMode ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        >
                        <div
                            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                            isDarkMode ? "translate-x-6" : "translate-x-0"
                            }`}
                        ></div>
                        </button>
                        <span className="text-sm">🌙</span>
                    </div>
                    <a
                        role="button"
                        className="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="userMenu"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>

                    {isAuthenticated && (
                        <a href="/literature-reviews" className="navbar-item">My reviews</a>
                    )}
                    {user?.is_superuser && (
                        <a href="/organisations">Organisations</a>
                    )}
                </div>

                <div className="navbar-menu" id="userMenu">
                    <div className="navbar-end">
                        <a href="/faq" className="navbar-item">
                            FAQ
                        </a>
                        {isAuthenticated ? (
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a href="/profile" className="navbar-link">
                                    {user.username}
                                </a>
                                <div className="navbar-dropdown">
                                    <a href="/profile" className="navbar-item">
                                        My profile
                                    </a>
                                    <a href="/literature-reviews" className="navbar-item">
                                        My reviews
                                    </a>
                                    <hr className="navbar-divider" />
                                    <a onClick={handleLogout} className="navbar-item">
                                        Logout
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <>
                                <a href="/register" className="navbar-item">
                                    <strong>Sign up</strong>
                                </a>
                                <a href="/login" className="navbar-item">
                                    Log in
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            {messages?.length > 0 && (
                <div className="messages message">
                    <ul className="messages__list">
                        {messages.map((msg, idx) => (
                            <li key={idx} className={`${msg.tags} message-body`}>
                                {msg.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default Header;
