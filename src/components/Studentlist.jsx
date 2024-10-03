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
    const [edit,Setedit] = useState(false)
    const [del,Setdel] = useState(false)
    const [subjects,Setsubjects] = useState([])
    const [Studentmarks,Setstudentmarks] = useState([])
    const [formdata,Setformdata] = useState(initalformdata)
    const [editdata,Seteditdata] = useState([])
    

    const HandleAddmodal = () => {
        Setadd(true)
    }

    const Handledelmodal = (item) => {
        Seteditdata({
            id:item.id,
            student_name:item.student_name,
            subjectid:item.subjectid,
            subjectname:item['subjects'].subjectname,
            marks:item.marks
        })
        Setdel(true)
    }

    const HandleEditmodal = (item) => {
        Seteditdata({
            id:item.id,
            student_name:item.student_name,
            subjectid:item.subjectid,
            marks:item.marks
        })
        Setedit(true)
    }

    const Handleclose = () => {
        Setadd(false)
    }

    const Handleeditclose = () => {
        Setedit(false)
    }

    const handleDelclose = () => {
        Setdel(false)
    }

    const Handleinput = (e) => {
        const {name,value} = e.target
        Setformdata({
            ...formdata,
            [name]:value
        })
    }

    const HandleinputUpd = (e) => {
        const {name,value} = e.target
        Seteditdata({
            ...editdata,
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
                    studentmarks()
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

    const Handleupdate = (e) => {
        e.preventDefault();
        if (editdata.student_name.length == 0) {
            toast.error('Student Name is required',{
                position:'bottom-center'
              })
        }

        if (editdata.subjectid.length ==0) {
            toast.error('Subject is required',{
                position:'bottom-center'
            })
        }

        if (editdata.marks.length ==0) {
            toast.error('Marks is required',{
                position:'bottom-center'
            })
        }

        try {
            console.log(editdata)
            axios.put(`studentmarks/${editdata.id}`,editdata)
            .then((res) => {
                
                if (res.status == 200) {
                    Setedit(false)
                    studentmarks()
                    toast.success("Student Marks Updated Successsfully",{
                        position:'bottom-center'
                    });

                }
            })
        } catch (error) {
            toast.error("Unable To Update Student Marks",{
                position:'bottom-center'
              });
        }
    }


    const Handledelete = (e) => {
        e.preventDefault();

        try {
            axios.delete(`studentmarks/${editdata.id}`)
            .then((res) =>{
                if (res.status == 200) {
                    Setdel(false)
                    studentmarks()
                    toast.success("Student Marks Deleted Successsfully",{
                        position:'bottom-center'
                    });

                }
            })
        } catch (error) {
            toast.error("Unable To Delete Student Marks",{
                position:'bottom-center'
              });
        }
    }


    const listsubjects = () => {
        axios.get('subjects')
            .then((res) => {
                Setsubjects(res.data.data)
        })
        
    }

    const studentmarks = () => {
        axios.get('studentmarks')
        .then((res) => {
            Setstudentmarks(res.data.data)
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
        studentmarks()
      
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
        {
            Studentmarks.map((item,index)=> (
                <tr key={index}>
                <td>{ index +1 }</td>
                <td>{item.student_name}</td>
                <td>{item['subjects'].subjectname}</td>
                <td>{item.marks}</td>
                <td>
                <Button 
              type='Button' 
              variant="primary"
              onClick={() => HandleEditmodal(item)}
              >Edit</Button>
              <Button 
              type='Button' 
              variant="danger"
              onClick={()=>Handledelmodal(item)}
              >Delete</Button>
                </td>
            </tr>
            ))
        }
       
       
        
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



  <Modal show={edit} onHide={Handleeditclose}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Student marks</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <Form onSubmit={Handleupdate}>
    <Form.Group className="mb-3" controlId="formemployeename">
      <Form.Label>Movie Title</Form.Label>
      <Form.Control 
      type="text" 
      name='student_name'
      onChange={HandleinputUpd}
      value={editdata.student_name}
      placeholder="Enter Movie Title" 
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formemployeename">
      <Form.Label>Subjects</Form.Label>
      <Form.Select name="subjectid" 
      onChange={HandleinputUpd}
      value={editdata.subjectid}
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
      onChange={HandleinputUpd}
      value={editdata.marks}
      />
</Form.Group> 
<Button type='submit' variant="primary">Update</Button>
  </Form>
  </Modal.Body>
  <Modal.Footer>
  <Button variant="secondary"
  onClick={Handleeditclose}>
  Close
</Button>
  </Modal.Footer>
</Modal>


<Modal show={del} onHide={handleDelclose}>
    <Modal.Header closeButton>
      <Modal.Title>Delete Student Marks</Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <p>Are you sure to Remove {editdata.student_name} marks for {editdata.subjectname}   ?</p>

    </Modal.Body>
    <Modal.Footer>
    <Button type='submit' 
    variant="primary"
    onClick={Handledelete}
    
    >Submit</Button>
    <Button 
    variant="secondary"
    onClick={handleDelclose}>
    Close
  </Button>
    </Modal.Footer>
  </Modal>







    
    </div>
  )
}

export default Studentlist