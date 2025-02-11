import { useState } from 'react'
import Navbar from '../components/Navbar'
import Expenseform from '../components/Expenseform'
import ExpenseList from '../components/ExpenseList'
import { ToastContainer } from 'react-toastify'
import React from 'react'

const Home = () => {
    const [expenses,setExpenses]=useState([]);
  const onExpenseAdded = (newExpense)=>{
    setExpenses((prevExpense=>[...prevExpense,newExpense]))
  }

  return (
    <>
    <ToastContainer/>
    <Navbar />
    <Expenseform onExpenseAdded={onExpenseAdded}/>
    <ExpenseList
      expenses = {expenses}
      setExpenses={setExpenses}
    />
    </>
  )
}

export default Home
