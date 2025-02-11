import React from 'react'
import Navbar from '../components/Navbar'
import ExpenseChart from '../components/ExpenseChart'

const Dashboard = () => {
  return (
    <>
    <Navbar />
    <div className='container'>
      <ExpenseChart />
    </div>
    </>
  )
}

export default Dashboard
