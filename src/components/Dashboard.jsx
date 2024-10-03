import React,{useEffect, useState } from 'react'
import Navigation from './Navigation'
import CounterCard from './counters/CounterCard'

import axios from '../contants/axios'


const Dashboard = () => {
  const [studentsCount, setstudentsCount] = useState(0);
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);


  const Subjectscount = () => {
    axios.get('subjects')
            .then((res) => {
              setSubjectsCount(res.data.data.length)
        })
  }

  const Studentscount = () => {
    
    axios.get('studentslist')
    .then((res) => {
      const list = res.data.data

      setstudentsCount(list.length)
      
      
      
      
    })
  }

  // studentslist


  useEffect(() => {
    Subjectscount()
    Studentscount()
  },[])
  return (
    <div>
    <Navigation/>
    <div className="counter-cards">
    <CounterCard title="Students" count={studentsCount} icon="👤" />
    <CounterCard title="Subjects" count={subjectsCount} icon="📝" />
    
  </div>
   
    </div>
  )
}

export default Dashboard
