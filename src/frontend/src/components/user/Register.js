import Base from "../base/Base";
import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password1: "",
    password2: "",
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
      alert("Account created successfully");
      navigate("/login");
    } else {
      alert("Registration could not be completed");
    }
  };

  return (
    <Base>
      <div className="flex items-center justify-center min-h-[80vh] px-4 my-2">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Create a new account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: First Name + Last Name (50/50) */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Nolan"
                />
              </div>
            </div>

            {/* Row 2: Username */}
            <div className="grid grid-cols-1">
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="JohnNolan2"
                />
              </div>
            </div>

            {/* Row 3: Email */}
            <div className="grid grid-cols-1">
              <div className="col-span-7">
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="john_nolan@gmail.com"
                />
              </div>
            </div>

            {/* Row 4: Password + Confirm Password */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="password1"
                  className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  id="password1"
                  name="password1"
                  type="password"
                  value={formData.password1}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Password"
                />
              </div>
              <div>
                <label
                  htmlFor="password2"
                  className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            {/* Row 4: Submit */}
            <div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors duration-200"
              >
                Sign Up!
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            If you already have an account,{" "}
            <a
              href="/login"
              className="text-orange-500 dark:text-orange-400 hover:underline"
            >
              <strong>sign in</strong>
            </a>{" "}
            instead.
          </p>
        </div>
      </div>
    </Base>
  );
}

export default Register;
