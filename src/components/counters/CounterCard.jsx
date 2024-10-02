import React from 'react'
import '../counters/CounterCard.css';

const CounterCard = ({ title, count, icon }) => {
  return (
    <div className="counter-card">
      <div className="card-icon">{icon}</div>
      <div className="card-info">
        <h3>{title}</h3>
        <p>{count}</p>
      </div>
    </div>
  )
}

export default CounterCard