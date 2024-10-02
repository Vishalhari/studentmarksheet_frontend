import React, { useState } from 'react'
import axios from '../contants/axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = () => {
  const initalformdata={
    name:'',
    email:'',
    password:''
  }

  const [formdata,Setformata] = useState(initalformdata)
  const navigation = useNavigate()
  const HandleInput = (e) => {
    const {name,value} = e.target
    Setformata({
      ...formdata,
      [name]:value
    })
  }

  const Handlesubmit = async(e) => {
    e.preventDefault();
    if(formdata.name.length ==0){
      toast.error('Name field is required',{
        position:'bottom-center'
      })
      return;
    }

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

    try {
      await axios.post('register',formdata)
      .then((res) => {
        if (res.status == 200) {
          Setformata(initalformdata)
          toast.success("User Successsfully Registered",{
            position:'bottom-center'
        });
        navigation('/login')
        
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
    <Navigation/>
    <div className='registerblk'>
      <h3>Registration</h3>
      <Form onSubmit={Handlesubmit}>
        <Form.Group className="mb-3" controlId="formname">
        <Form.Label className='float-start'>First Name</Form.Label>
        <Form.Control 
        type="text"  
        name='name'
        onChange={HandleInput}
        value={formdata.name}
        placeholder="Enter Full Name"
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formname">
        <Form.Label className='float-start'>Email</Form.Label>
        <Form.Control 
        type="text"  
        name='email'
        onChange={HandleInput}
        value={formdata.email}
        placeholder="Enter Email"
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formname">
        <Form.Label className='float-start'>Password</Form.Label>
        <Form.Control 
        type="password"  
        name='password'
        onChange={HandleInput}
        value={formdata.password}
        placeholder="Enter Password"
        />
        </Form.Group>
        <Button type='submit' variant="primary">Register</Button>
      </Form>
    </div>
    </div>
  )
}

export default Register