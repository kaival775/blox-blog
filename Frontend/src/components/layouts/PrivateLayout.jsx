import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PrivateNav from '../PrivateNav';
import { useAuth } from '../../context/AuthContext';

const PrivateLayout = () => {
  const auth = useAuth();
  if (!auth) {
    return <Navigate to="login" />
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <PrivateNav />
      <main className="container mx-auto px-4 py-8">
        <Outlet/> 
      </main>
    </div>
  )
}

export default PrivateLayout