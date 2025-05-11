import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Header({ messages }) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/">
            <img
              src="cruise-logo.png"
              alt="Cruise Logo"
              width="60"
              height="60"
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 ml-auto">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-gray-700 dark:text-gray-200 hover:underline"
              >
                {user.username}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md z-50">
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    My profile
                  </a>
                  <a
                    href="/literature-reviews"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    My reviews
                  </a>
                  <hr className="border-t my-1 dark:border-gray-600" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-700 dark:text-gray-200 space-x-2">
              <a href="/login" className="hover:underline">
                Log in
              </a>
              <span>|</span>
              <a href="/register" className="hover:underline font-semibold">
                Sign up
              </a>
            </div>
          )}

          {/* Dark Mode Toggle (always visible on desktop) */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
              isDarkMode ? "bg-yellow-400" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                isDarkMode ? "translate-x-6" : "translate-x-0"
              }`}
            >
              <span className="text-sm">{isDarkMode ? "🌙" : "☀️"}</span>
            </div>
          </button>
        </div>

        {/* Mobile: Toggle + Burger aligned right */}
        <div className="flex items-center gap-4 lg:hidden ml-auto">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
              isDarkMode ? "bg-yellow-400" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                isDarkMode ? "translate-x-6" : "translate-x-0"
              }`}
            >
              <span className="text-sm">{isDarkMode ? "🌙" : "☀️"}</span>
            </div>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 dark:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-6 py-4 space-y-2 bg-white dark:bg-gray-800 shadow-md">
          {isAuthenticated ? (
            <>
              <a
                href="/profile"
                className="block text-gray-700 dark:text-gray-200 hover:underline"
              >
                My profile
              </a>
              <a
                href="/literature-reviews"
                className="block text-gray-700 dark:text-gray-200 hover:underline"
              >
                My reviews
              </a>
              {user?.is_superuser && (
                <a
                  href="/organisations"
                  className="block text-gray-700 dark:text-gray-200 hover:underline"
                >
                  Organisations
                </a>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left text-gray-700 dark:text-gray-200 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="block text-gray-700 dark:text-gray-200 hover:underline"
              >
                Log in
              </a>
              <a
                href="/register"
                className="block text-gray-700 dark:text-gray-200 hover:underline font-semibold"
              >
                Sign up
              </a>
            </>
          )}
        </div>
      )}

      {/* Messages */}
      {messages?.length > 0 && (
        <div className="px-6 py-4">
          <ul className="space-y-2">
            {messages.map((msg, idx) => (
              <li
                key={idx}
                className={`p-4 rounded-md ${msg.tags.includes("error") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
              >
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
