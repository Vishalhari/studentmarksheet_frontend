import React from 'react'
import { Route,Routes } from 'react-router-dom'

import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login';
import Dashboard from '../components/Dashboard'

const UserRouter = () => {
  return (
    
    <Routes>
    <Route path='/' Component={Home}/>
    <Route path='/register' Component={Register}/>
    <Route path='/login' Component={Login}/>
    <Route path='/dashboard' Component={Dashboard}/>

    </Routes>
    
  )
}

export default UserRouter