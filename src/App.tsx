import React from 'react';
import useStore from './store/useStore';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <>
      {currentUser ? <Dashboard /> : <Login />}
    </>
  );
}

export default App;
