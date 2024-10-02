import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { toast } from 'react-toastify';

import Navigation from './Navigation'

import axios from '../contants/axios'


const Studentlist = () => {
    const initalformdata = {
        student_name:'',
        subjectid:'',
        marks:''
    }
    const [add,Setadd] = useState(false)
    const [subjects,Setsubjects] = useState([])
    const [formdata,Setformdata] = useState(initalformdata)

    const HandleAddmodal = () => {
        Setadd(true)
    }

    const Handleclose = () => {
        Setadd(false)
    }

    const Handleinput = (e) => {
        const {name,value} = e.target
        Setformdata({
            ...formdata,
            [name]:value
        })
    }

    const Handlesubmit = (e) => {
        e.preventDefault();

        if (formdata.student_name.length == 0) {
            toast.error('Student Name is required',{
                position:'bottom-center'
              })
        }

        if (formdata.subjectid.length ==0) {
            toast.error('Subject is required',{
                position:'bottom-center'
            })
        }

        if (formdata.marks.length ==0) {
            toast.error('Marks is required',{
                position:'bottom-center'
            })
            
        }

        try {
            axios.post('studentmarks',formdata)
            .then((res) => {
                if (res.status == 200) {
                    Setadd(false)
                    Setformdata(initalformdata)
                    toast.success("Student Marks Successsfully Added",{
                        position:'bottom-center'
                    });
                }
            })
        } catch (error) {
            toast.error("Unable To create Student Marks",{
                position:'bottom-center'
              });
        }

    }


    const listsubjects = () => {
        axios.get('subjects')
            .then((res) => {
                Setsubjects(res.data.data)
        })
        .catch((error) => {
            toast.error("Unable to Fetch Subjects", {
                position: 'bottom-center'
            });
        })
    }


    useEffect(() => {
        var access_token = localStorage.getItem('access_token')
        if(!access_token){
            toast.success("Session Expired,Login Now",{
                position:'bottom-center'
            });
            navigation('/login')
        }
        listsubjects()
    },[])
  return (
    <div>
    <Navigation/>
    <div className='container'>
        <h3>Student Marks</h3>
        <Button 
        type='submit' 
        variant="primary"
        onClick={HandleAddmodal}
        >Add Student Marks</Button>
        <br/>
        <Table striped bordered hover>
        <thead>
        <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Subjects</th>
            <th>Marks</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
        </tr>
        
        </tbody>
    </Table>
    </div>



    <Modal show={add} onHide={Handleclose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Student marks</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={Handlesubmit}>
      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>Movie Title</Form.Label>
        <Form.Control 
        type="text" 
        name='student_name'
        onChange={Handleinput}
        value={formdata.student_name}
        placeholder="Enter Movie Title" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>Subjects</Form.Label>
        <Form.Select name="subjectid" 
        onChange={Handleinput}
        aria-label="Default select example">
        <option>Select Subjects</option>
        {
            subjects.map((item,index) => (
                <option value={item.id} key={index}>{item.subjectname}</option>
            ))
        }
        </Form.Select>
    </Form.Group>
      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>Marks</Form.Label>
        <Form.Control 
        type="text" 
        name='marks'
        placeholder="Enter Marks" 
        onChange={Handleinput}
        value={formdata.marks}
        />
      

</Form.Group> 
<Button type='submit' variant="primary">Add</Button>
    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary"
    onClick={Handleclose}>
    Close
  </Button>
    </Modal.Footer>
  </Modal>





    
    </div>
  )
}

export default Studentlist