import { useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import UserRouter from './routes/Router'
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <UserRouter/>
    </BrowserRouter>
  )
}

export default App
