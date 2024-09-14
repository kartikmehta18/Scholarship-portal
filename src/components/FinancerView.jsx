import React from 'react';

const FinancerView = () => {
  const handleReleaseFunds = (requestId) => {
    console.log('Funds released for request ID:', requestId);
    // Add logic to release funds
  };

  return (
    <div>
      <h3>Financer View: Release Funds</h3>
      <table>
        <thead>
          <tr>
            <th>Student Wallet</th>
            <th>Verified Document</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0x123456789...abc</td>
            <td>Verified Document Link</td>
            <td>
              <button onClick={() => handleReleaseFunds(1)}>Release 0.1 ETH</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FinancerView;
