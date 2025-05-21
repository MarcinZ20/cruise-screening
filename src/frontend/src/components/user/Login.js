import Base from "../base/Base";
import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result === true) {
      navigate("/");
    } else {
      alert("Something went wrong :c");
    }
  };

  return (
    <Base>
      <div className="flex items-center justify-center min-h-[80vh] px-4 ">
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center justify-center p-1 mb-3">
            <h1 className="text-4xl font-bold mb-2 text-center text-gray-800 dark:text-gray-100">
              Sign in
            </h1>
            <p className="text-sm dark:text-white">Enter your credentials to sign in</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-5 p-2">
            <a className="px-6 py-2 rounded-md shadow-md bg-transparent hover:cursor-pointer" href="#">
              <svg
                width="25px"
                height="25px"
                viewBox="-3 0 262 262"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                />
              </svg>
            </a>

            <a className="px-6 py-2 rounded-md shadow-md bg-transparent hover:cursor-pointer" href="#">
              <svg
                fill="#000000"
                width="25px"
                height="25px"
                viewBox="-52.01 0 560.035 560.035"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655" />
              </svg>
            </a>

            <a className="px-6 py-2 rounded-md shadow-md bg-transparent hover:cursor-pointer" href="#">
              <svg
                width="25px"
                height="25px"
                viewBox="38.657999999999994 12.828 207.085 207.085"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
                  fill="#3c5a9a"
                />
              </svg>
            </a>
          </div>
          <div className="flex flex-row items-center justify-center gap-2 py-2">
            <hr className="w-40 h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <p className="text-black dark:text-white">or</p>
            <hr className="w-40 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors duration-200"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-orange-400 dark:text-orange-500 hover:underline"
            >
              <strong>Register here</strong>
            </a>
            !
          </p>
        </div>
      </div>
    </Base>
  );
}

export default Login;
