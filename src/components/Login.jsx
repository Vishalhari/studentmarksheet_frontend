import React, { useState } from 'react'
import axios from '../contants/axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import validator from 'validator';

const Login = () => {
  const initalformdata={
    email:'',
    password:''
  }

  const [formdata,Setformata] = useState(initalformdata)
  const navigation = useNavigate()
  const Handleinput = (e) => {
    const {name,value} = e.target
    Setformata({
      ...formdata,
      [name]:value
    })
  }

  const HandleSubmit = async(e) => {
    e.preventDefault();
    if (formdata.email.length ==0) {
      toast.error('Email field is required',{
        position:'bottom-center'
      })
      return;
    }

    if(formdata.password.length <=8){
      toast.error('Password must be at least 8 characters long.',{
          position:'bottom-center'
      })
      return;
    }

    if (formdata.email.length >0) {
      if (!validator.isEmail(formdata.email)) {
        toast.error('Email is invalid Format.',{
          position:'bottom-center'
      })
      return;
      } 
    }

    

    try {
      axios.post('login',formdata,{
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then((res) => {
       console.log(res)
        if (res.status == 200) {
          localStorage.clear()
          localStorage.setItem('access_token',res.data.access_token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`

          navigation('/dashboard')
        } else if (res.status == 401) {
          toast.error('Invalid Username Or Password.',{
            position:'bottom-center'
        })
        } 
      }).catch((err) => {
        if (err.status == 401) {
          toast.error('Invalid Username Or Password.',{
            position:'bottom-center'
        })
        }
      })
    } catch (error) {
      console.log(error.response)
    }

  }
  return (
    <div>
      <Navigation/>
      <div className='loginblk'>
      <h3>Login</h3>
      <Form onSubmit={HandleSubmit}>
      <Form.Group className="mb-3" controlId="formname">
      <Form.Label className='float-start'>Email</Form.Label>
      <Form.Control 
      type="text"  
      name='email'
      onChange={Handleinput}
      value={formdata.email}
      placeholder="Enter Email"
      />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formname">
      <Form.Label className='float-start'>Password</Form.Label>
      <Form.Control 
      type="password"  
      name='password'
      onChange={Handleinput}
      value={formdata.password}
      placeholder="Enter Password"
      />
      </Form.Group>
      <Button type='submit' variant="primary">Login</Button>
      </Form>
      </div>
    </div>
  )
}

export default Login