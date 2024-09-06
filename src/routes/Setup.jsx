import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock function to simulate directory selection
const handleDirectorySelection = async (type) => {
  try {
    const dirHandle = await window.showDirectoryPicker(); // Opens the directory picker
    console.log(`${type} directory selected:`, dirHandle.name);
    return dirHandle;
  } catch (err) {
    console.error('Error selecting directory:', err);
    return null;
  }
};

// Render the component
export default function Setup({status, setStatus}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!terms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    setError('');
    setLoading(true); // Start loading

    // Simulate a network request or processing time
    setTimeout(() => {
      setStatus(true); // Hide the form
      setLoading(false); // Stop loading
      console.log('Form submitted', { email, password });
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  return !status ? (
    <form className="max-w-sm mx-auto mt-5" onSubmit={handleSubmit}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70">
          <div className="px-6 py-3 text-lg font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            Loading...
          </div>
        </div>
      )}
      {!loading && (
        <>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
            <input
              type="password"
              id="repeat-password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <Link to="/main_window" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</Link></label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register new account
          </button>
        </>
      )}
    </form>
  ) : null;
}
