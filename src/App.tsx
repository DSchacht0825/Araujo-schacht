import React from 'react';
import useSupabaseStore from './store/supabaseStore';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const isAuthenticated = useSupabaseStore((state) => state.isAuthenticated);

  return (
    <>
      {isAuthenticated ? <Dashboard /> : <Login />}
    </>
  );
}

export default App;
