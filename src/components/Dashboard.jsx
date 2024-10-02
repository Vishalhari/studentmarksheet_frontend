import React,{useState } from 'react'
import Navigation from './Navigation'
import CounterCard from './counters/CounterCard'


const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  return (
    <div>
    <Navigation/>
    <div className="counter-cards">
    <CounterCard title="Users" count={usersCount} icon="👤" />
    <CounterCard title="Posts" count={postsCount} icon="📝" />
    <CounterCard title="Sales" count={salesCount} icon="💰" />
  </div>
   
    </div>
  )
}

export default Dashboard
