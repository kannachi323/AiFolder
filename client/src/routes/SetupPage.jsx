import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useFormReducer } from '../hooks/useFormReducer.jsx';

export function SetupPage() {

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Outlet />
    </div>
  );
}

export function RegisterPage() {
  const [state, dispatch] = useFormReducer();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.password !== state.repeatPassword) {
      dispatch({ type: 'SET_ERROR', error: 'Passwords do not match' });
      return;
    }
    if (!state.terms) {
      dispatch({ type: 'SET_ERROR', error: 'You must agree to the terms and conditions' });
      return;
    }
    dispatch({ type: 'SET_ERROR', error: '' });
    dispatch({ type: 'SET_LOADING', loading: true });
    //TODO: process JWT token or some form of authentication
    navigate('/main_window');
    dispatch({ type: 'SET_LOADING', loading: false})
    
  };

  return (
    <div className="flex flex-col justify-start items-center">
      <h1 className="text-white text-3xl">AiFolder</h1>
      <form className="max-w-sm mx-auto mt-3" onSubmit={handleSubmit}>
        {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
        {state.loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70">
            <div className="px-6 py-3 text-lg font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
              Loading...
            </div>
          </div>
        )}
        {!state.loading && (
          <>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input
                type="email"
                id="email"
                value={state.email}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="abc@gmail.com"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input
                type="password"
                id="password"
                value={state.password}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
              <input
                type="password"
                id="repeat-password"
                value={state.repeatPassword}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'repeatPassword', value: e.target.value })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={state.terms}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'terms', value: e.target.checked })}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <Link to="/main_window" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</Link></label>
            </div>
            <div className="flex flex-col items-start justify-center">
              <label htmlFor="register" className="py-3 text-sm font-medium text-gray-900 dark:text-gray-300">Already have an account? <Link to="/user/login" className="text-blue-600 hover:underline dark:text-blue-500">Login</Link></label>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register new account
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export function LoginPage() {
  const [state, dispatch] = useFormReducer();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'SET_ERROR', error: '' });
    dispatch({ type: 'SET_LOADING', loading: true });
    navigate('/main_window');
    dispatch({ type: 'SET_LOADING', loading: false});
  };

  return (
    <div className="flex flex-col justify-start items-center">
      <h1 className="text-white text-3xl">AiFolder</h1>
      <form className="max-w-sm mx-auto mt-3" onSubmit={handleSubmit}>
        {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
        {state.loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70">
            <div className="px-6 py-3 text-lg font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
              Loading...
            </div>
          </div>
        )}
        {!state.loading && (
          <>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input
                type="email"
                id="email"
                value={state.email}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="abc@gmail.com"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input
                type="password"
                id="password"
                value={state.password}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  checked={state.remember}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'remember', value: e.target.checked })}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <div className="flex flex-col items-start justify-center">
              <label htmlFor="login" className="py-3 text-sm font-medium text-gray-900 dark:text-gray-300">Don't have an account? <Link to="/user/register" className="text-blue-600 hover:underline dark:text-blue-500">Register</Link></label>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}