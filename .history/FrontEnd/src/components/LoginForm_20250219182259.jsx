import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Api from '../Api/api';

const LoginForm = ({setToken,setUserName}) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error state on form submit

    try {
      const response = await Api.post('/api/users/login', { usernameOrEmail, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', response.data.username);

     //Update the token in the App component state
      setToken(response.data.token); // Set token in App component state
      setUserName(response.data.username); // set username in App component state

      navigate('/chat'); // Redirect to the chat page
    } catch (err) {
      console.error('Login failed', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false); // Stop the loading spinner after the request is complete
    }
  };



  return (
     <div className="login-form">

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username or Email:</label>
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 mt-4 bg-blue-500 text-white rounded-lg focus:outline-none ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p
            className='text-center mt-4'>
              Don't have an account?{' '}
              <button
              className='text-blue-500 hover:underline'
              onClick={() => navigate('/register')}
              >
                Register</button></p>

                <p>
              <button
              className='text-blue-500 hover:underline'
              onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?</button
                </p>
                

          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;