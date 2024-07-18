import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function TransactionGraph({ data, selectedCustomer }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!selectedCustomer) return;

    const customerTransactions = data.transactions.filter(
      (transaction) => transaction.customer_id === selectedCustomer.id
    );

    const transactionsByDate = customerTransactions.reduce((acc, transaction) => {
      acc[transaction.date] = (acc[transaction.date] || 0) + transaction.amount;
      return acc;
    }, {});

    const labels = Object.keys(transactionsByDate);
    const values = Object.values(transactionsByDate);

    const chartConfig = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Total Transactions',
            data: values,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };

    const chartInstance = new Chart(canvasRef.current, chartConfig);

    return () => {
      chartInstance.destroy();
    };
  }, [data, selectedCustomer]);

  return (
    <div className="flex justify-center my-8">
      <div className="w-full max-w-4xl mx-4">
        <h2 className="text-2xl font-bold text-center mb-4">{selectedCustomer.name}'s Transactions</h2>
        <div className="relative h-96">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default TransactionGraph;
