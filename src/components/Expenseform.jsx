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
    const [date,setDate] = useState('');

    const handleSubmit= async(e) =>{
        e.preventDefault();
        if(!amount || !category || !date)
            {
                console.log("error");
                return toast.error("Both amount, category and date are required!");
            } 
        try{
            const response = await axios.post(`${BASE_URL}`,{amount,category,description,date});
            onExpenseAdded(response.data)
            toast.success("Expense added.");
            setAmount('');
            setCategory('');
            setDescription('');
            setDate('');
        }
        catch(e){
            toast.error("Failed!");
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <input type="number" placeholder='Amount' value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
        {/* <input type="text" placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)}/> */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
            </select>
        <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        <button type='submit'>Add Expense</button>
    </form>
  )
}

export default Expenseform
