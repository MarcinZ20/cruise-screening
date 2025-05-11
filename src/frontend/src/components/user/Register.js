import Base from '../base/Base';
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result === true) {
      alert('Account created successfully');
      navigate('/login');
    } else {
      alert('Registration could not be completed');
    }
  };

  return (
    <Base>
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Create a new account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: 'username', type: 'text', label: 'Username', placeholder: 'Enter your username' },
              { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email' },
              { name: 'first_name', type: 'text', label: 'First name', placeholder: 'Enter your first name' },
              { name: 'last_name', type: 'text', label: 'Last name', placeholder: 'Enter your last name' },
              { name: 'password1', type: 'password', label: 'Password', placeholder: 'Enter your password' },
              { name: 'password2', type: 'password', label: 'Confirm Password', placeholder: 'Confirm your password' },
            ].map(({ name, type, label, placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={placeholder}
                />
              </div>
            ))}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors duration-200"
              >
                Sign Up!
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            If you already have an account,{' '}
            <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              <strong>sign in</strong>
            </a>{' '}
            instead.
          </p>
        </div>
      </div>
    </Base>
  );
}

export default Register;
