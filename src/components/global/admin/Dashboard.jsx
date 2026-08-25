import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register necessary components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, Filler);

const Dashboard = () => {
    const chartRef = useRef(null); // Create a ref to hold chart instance

    const data = {
        labels: [
            '00:00', '01:00', '02:00', '03:00', '04:00', 
            '05:00', '06:00', '07:00', '08:00', '09:00', 
            '10:00', '11:00', '12:00', '13:00', '14:00', 
            '15:00', '16:00', '17:00', '18:00', '19:00', 
            '20:00', '21:00', '22:00', '23:00'
        ],
        datasets: [
            {
                label: 'تعداد بازدیدکنندگان',
                data: [10, 20, 15, 5, 8, 12, 30, 45, 60, 75, 80, 90, 100, 110, 120, 130, 150, 180, 200, 220, 250, 300, 350, 400, 500, 600, 700, 800, 900, 1000],
                borderColor: 'rgb(22, 94, 226)',
                backgroundColor: 'rgba(75, 122, 192, 0.2)',
                borderWidth: 2,
                fill: true
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Prevent maintaining aspect ratio
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'تعداد بازدیدکنندگان'
                }
            },
            x: {
                type: 'category', // Specify the x-axis type
                title: {
                    display: true,
                    text: 'زمان'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                    }
                }
            }
        }
    };

    useEffect(() => {
        const chartInstance = chartRef.current; // Get the current chart instance
        return () => {
            if (chartInstance) {
                chartInstance.destroy(); // Destroy the chart instance on unmount
            }
        };
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', height: '400px',paddingBottom:"100px" }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>آمار بازدیدکنندگان سایت</h1>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Line ref={chartRef} data={data} options={options} />
            </div>
        </div>
    );
};

export default Dashboard;