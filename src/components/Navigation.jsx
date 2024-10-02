import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

import axios from '../contants/axios'


import { Link } from 'react-router-dom';

const Navigation = () => {
  
  const [isAuth,setIsAuth] = useState(false)
  const navigation = useNavigate()
  useEffect(()=> {
    const accesstoken = localStorage.getItem('access_token');
    if(accesstoken !==null){
        setIsAuth(true)
    }
  },[isAuth])

  const userlogout = () => {
    const accesstoken = localStorage.getItem('access_token');

    if(accesstoken == null){
      localStorage.clear()
      axios.defaults.headers.common['Authorization'] = null
      navigation('/login')
    } else{
      try {
        axios.post('logout',{
          headers:{
            'Content-Type': 'application/json'
          }
        })
        localStorage.clear()
        axios.defaults.headers.common['Authorization'] = null
        navigation('/login')
      } catch (error) {
        console.log('logout not working', error)
      }
    }
  }

  return (
    
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Movies App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/">home</Nav.Link>
          {
            !isAuth ?
            <Nav.Link as={Link} to="/register">Register</Nav.Link>:
            ''
          }

          {
            isAuth ?
            <Nav.Link as={Link} to="/studentlist">Students</Nav.Link>:
            ''
          }
          

         

          {
            isAuth ? 
            <Nav.Link onClick={userlogout}>logout</Nav.Link>:
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
  )
}

export default Navigation