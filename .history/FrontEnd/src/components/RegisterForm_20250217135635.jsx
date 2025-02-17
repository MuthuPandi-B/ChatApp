// import React, { useState } from 'react';
// import axios from 'axios';
// import Api from '../Api/api';

// const RegisterForm = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await Api.post('/api/users/register', { usernameOrEmail: username, email, password });
//       alert('User registered successfully');
//     } catch (error) {
//       console.error('Registration failed', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="register-form">
//       <div>
//         <label>Username:</label>
//         <input type="text" value={usernameOrEmail} onChange={(e) => setUsername(e.target.value)} />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </div>
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegisterForm;
import React, { useState } from 'react';
import Api from '../Api/api';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error state on form submit
  
    try {
      await Api.post('/api/users/register', { username, email, password });
      alert('User registered successfully');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Registration failed', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false); // Stop the loading spinner after the request is complete
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
