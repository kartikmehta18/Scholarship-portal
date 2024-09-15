import React from 'react';

const FinancerView = ({ requests, sendTokens }) => {
  return (
    <div>
      <h3 className='text-black'>Financer View: Release Funds</h3>
      <table>
        <thead>
          <tr>
            <th className='text-black'>Student Wallet</th>
            <th className='text-black' >Verified Document</th>
            <th className='text-black' >Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.walletAddress}</td>
              <td>{request.document}</td>
              <td>
                <button  className='text-black' onClick={() => sendTokens(index)}>Release Funds</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancerView;
