// Logout.js
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // You might want to redirect the user or update UI here
    console.log('User logged out');
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
