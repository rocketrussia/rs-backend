import React from 'react';
import 'materialize-css'
import {AuthContext} from './context/AuthContext'
import {useAuth} from './hooks/auth.hook'
import AuthPage from './pages/AuthPage';

const App = () => {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <div className="container">
        <AuthPage />
      </div>
    </AuthContext.Provider>
  );
}

export default App
