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
import './styles/Piechart.css'

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale);

const ExpenseChart = () => {

    const BASE_URL = 'https://expense-tracker-backend-1-tukw.onrender.com/expenses';

    const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [], backgroundColor: [] }] });
    const [selectedDate, setSelectedDate] = useState(''); 


    useEffect(() => {
      const fetchData = async () => {
          try {
              const url = selectedDate 
                  ? `${BASE_URL}/stats?date=${selectedDate}`
                  : `${BASE_URL}/stats`;
              
              const res = await axios.get(url);
              console.log("API response", res.data);

              if (res.data.amounts.length > 0) {
                  setChartData({
                      labels: res.data.categories,
                      datasets: [{
                          data: res.data.amounts.map(Number),  // Ensure values are numbers
                          backgroundColor: res.data.categories.map((_, index) =>
                              ['#ff6384', '#36a2eb', '#ffcd56'][index % 3]
                          )
                      }]
                  });
              } else {
                  console.error("No data available for chart.");
                  setChartData({ labels: [], datasets: [{ data: [], backgroundColor: [] }] });
              }
          } catch (err) {
              console.error("Chart API Error:", err);
          }
      };

      fetchData();
  }, [selectedDate]);
  
  if (chartData.datasets[0].data.length === 0) {
    return <p>No expense data available.</p>;
}


  return (
    <div className='pie-chart-container'>
      <div className='filter-container'>
                <label>Select Date: </label>
                <input 
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)} 
                />
            </div>
            {chartData.datasets[0].data.length > 0 ? (
                <Pie data={chartData} />
            ) : (
                <p>No expense data available.</p>
            )}
    </div>
  )
}

export default ExpenseChart
