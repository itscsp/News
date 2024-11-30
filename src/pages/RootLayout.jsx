import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header/Header'

const RootLayout = () => {
  return (
    <>
    <Header />
    <main className='container'>
        <Outlet />
    </main>
    </>
  )
}

export default RootLayout