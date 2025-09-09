import React, { useEffect } from 'react';
import useStore from './store';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { checkSupabaseEnv } from './utils/envCheck';

function App() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  
  useEffect(() => {
    const envCheck = checkSupabaseEnv();
    console.log('🏪 Store configuration:', envCheck.isConfigured ? 'Supabase' : 'LocalStorage');
  }, []);

  return (
    <>
      {isAuthenticated ? <Dashboard /> : <Login />}
    </>
  );
}

export default App;
