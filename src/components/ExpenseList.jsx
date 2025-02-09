import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale
} from 'chart.js';
import './styles/Expenselist.css'

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale);

const ExpenseList = ({expenses , setExpenses}) => {
    // const [expenses,setExpenses]=useState([]);
    useEffect(()=>{
        //axios.get('http://localhost:5000/expenses').then(res => setExpenseList(res.data)).catch(err => console.error(err));
         // Mock data instead of API call
         const mockExpenses = [
            { id: 1, category: 'Food', amount: 200, description: 'Groceries' },
            { id: 2, category: 'Transport', amount: 50, description: 'Bus fare' },
            { id: 3, category: 'Entertainment', amount: 100, description: 'Movie' },
        ];
        setExpenses(mockExpenses);
    },[setExpenses]);

    const categories = [...new Set(expenses.map(expense=>expense.category))];
    const amounts = categories.map((category)=>{
        return expenses.filter((expense)=>expense.category===category).reduce((acc, expense) => acc + expense.amount, 0);
    });
        // Chart data
    const chartData = {
        labels: categories,
        datasets: [
        {
            data: amounts,
            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'], // Customize colors
        },
        ],  
    };

  return (
    <div>
      <h3>Expense History</h3>
        <ul>
            {expenses.map(expense => (
                <li key={expense.id}>
                    {expense.category}: ₹{expense.amount} ({expense.description})
                </li>
            ) )}
        </ul>
        <h3>Expense Distribution</h3>
        <div className="pie-chart-container">
            <Pie data={chartData}/>
        </div>
    </div>
  )
}

export default ExpenseList
