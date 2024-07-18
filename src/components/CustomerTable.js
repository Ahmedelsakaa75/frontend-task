import React, { useState } from 'react';

function CustomerTable({ data, setSelectedCustomer }) {
  const [searchName, setSearchName] = useState('');
  const [searchAmount, setSearchAmount] = useState('');

  const handleNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setSearchAmount(e.target.value);
  };

  const customersWithTotalTransactions = data.customers.map(customer => {
    const totalTransactions = data.transactions
      .filter(transaction => transaction.customer_id === customer.id)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    return { ...customer, totalTransactions };
  });

  const filteredCustomers = customersWithTotalTransactions.filter(customer => {
    return (
      customer.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchAmount === '' || customer.totalTransactions >= parseFloat(searchAmount))
    );
  });

  return (
    <div className="flex justify-center my-8">
      <div className="w-full max-w-4xl mx-4">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Filter by name"
            value={searchName}
            onChange={handleNameChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Filter by transaction amount"
            value={searchAmount}
            onChange={handleAmountChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-800 text-white text-center">ID</th>
              <th className="py-3 px-6 bg-gray-800 text-white text-center">Name</th>
              <th className="py-3 px-6 bg-gray-800 text-white text-center">Total Transactions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`cursor-pointer hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <td className="py-3 px-6 border-b border-gray-300 text-center">{customer.id}</td>
                <td className="py-3 px-6 border-b border-gray-300 text-center">{customer.name}</td>
                <td className="py-3 px-6 border-b border-gray-300 text-center">{customer.totalTransactions.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerTable;
