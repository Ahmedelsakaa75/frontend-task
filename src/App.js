import React, { useState, useEffect } from 'react';
import CustomerTable from './components/CustomerTable';
import TransactionGraph from './components/TransactionGraph';

function App() {
  const [data, setData] = useState({ customers: [], transactions: [] });
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/customers')
      .then((response) => response.json())
      .then((customers) => {
        fetch('http://localhost:5000/transactions')
          .then((response) => response.json())
          .then((transactions) => {
            setData({ customers, transactions });
          });
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Customer Transactions</h1>
      <CustomerTable data={data} setSelectedCustomer={setSelectedCustomer} />
      {selectedCustomer && <TransactionGraph data={data} selectedCustomer={selectedCustomer} />}
    </div>
  );
}

export default App;
