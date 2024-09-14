import React from 'react';

const FinancerView = ({ requests, sendTokens }) => {
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
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.walletAddress}</td>
              <td>{request.document}</td>
              <td>
                <button onClick={() => sendTokens(index)}>Release 0.1 ETH</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancerView;
