import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './styles/Expenseform.css'

const Expenseform = ({onExpenseAdded}) => {

    const [amount,setAmount] = useState('');
    const [category,setCategory] = useState('');
    const [description,setDescription] = useState('');

    const handleSubmit= async(e) =>{
        e.preventDefault();
        if(!amount || !category)
            {

                console.log("error");
                return toast.error("Both amount and category required!");
            } 
        try{
            const mockResponse = {
                id:Math.floor(Math.random()*1000),
                amount: parseFloat(amount),
                category,
                description
            };
            //const response = await axios.post('http://localhost:5173/expenses',{amount,category,description});
           // onExpenseAdded(response.data);
            onExpenseAdded(mockResponse);
            toast.success("Expense added.");
            setAmount('');
            setCategory('');
            setDescription('');
        }
        catch(e){
            toast.error("Failed!");
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <input type="number" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)}/>
        {/* <input type="text" placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)}/> */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Entertainment">Entertainment</option>
            </select>
        <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
        <button type='submit'>Add Expense</button>
    </form>
  )
}

export default Expenseform
