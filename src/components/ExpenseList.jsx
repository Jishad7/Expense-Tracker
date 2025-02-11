import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { Pie } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     ArcElement,
//     Tooltip,
//     Legend,
//     Title,
//     CategoryScale
// } from 'chart.js';
import './styles/Expenselist.css'

// Register the necessary components
//ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale);

const ExpenseList = ({expenses , setExpenses}) => {

    const BASE_URL = 'https://expense-tracker-backend-1-tukw.onrender.com/expenses';

    const [selectedDate , setSelectedDate] = useState('');

    useEffect(()=>{
        if(selectedDate)
        {
            axios.get(`${BASE_URL}?date=${selectedDate}`)
                .then(res => setExpenses(res.data))
                .catch(err => console.error(err));
        }
        else
        axios.get(`${BASE_URL}`).then(res => setExpenses(res.data)).catch(err => console.error(err));
    },[setExpenses,selectedDate]);

    const handleDelete = async(id)=>{
        try{
            await axios.delete(`${BASE_URL}/${id}`);
            setExpenses(expenses.filter(expense => expense.id != id));
        }
        catch(err)
        {
            console.error("Error deleting expense",err);
        }
    }


    const groupedExpenses = expenses.reduce((acc, expense) => {
        acc[expense.category] = acc[expense.category] || [];
        acc[expense.category].push(expense);
        return acc;
    }, {});


  return (
    <div className='expense-container'>
            <h3>Expense History</h3>
            <div className="selectDate">
            <label>Select Date: </label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
            <div className="tables-container">
                {Object.keys(groupedExpenses).length > 0 ? (
                    Object.keys(groupedExpenses).map(category => {
                        const total = groupedExpenses[category]?.reduce((sum, expense) => sum + Number(expense.amount || 0), 0) || 0;
                        return (
                            <div className="expense-table" key={category}>
                                <h4>{category}</h4>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Amount</th>
                                            <th>Description</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupedExpenses[category].map(expense => (
                                            <tr key={expense.id}>
                                                <td>₹{expense.amount}</td>
                                                <td>{expense.description}</td>
                                                <td>{expense.date}</td>
                                                <td><button onClick={() => handleDelete(expense.id)}>Delete</button></td>
                                            </tr>
                                        ))}
                                        {/* Total Row */}
                                        <tr className="total-row">
    <td colSpan="3"><strong>Total</strong></td>
    <td><strong>₹{Number(total).toFixed(2)}</strong></td>
</tr>

                                    </tbody>
                                </table>
                            </div>
                        );
                    })
                ) : (
                    <h3>No expenses found for the selected date</h3>
                )}
            </div>
        </div>
  )
}

export default ExpenseList
