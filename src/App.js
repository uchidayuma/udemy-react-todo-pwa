import React from 'react';
import { AuthProvider } from './providers/AuthProvider';
import './App.css';
import './service/firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Dashboard />
      <Footer />
    </AuthProvider>
  );
}

export default App;
