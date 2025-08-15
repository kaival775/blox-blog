import React from 'react'
import { Navigate } from 'react-router-dom'
import PublicNav from '../PublicNav'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PublicLayout = () => {
  const auth = useAuth();
  if (auth) {
   return <Navigate to="/"/>
  }
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default PublicLayout