import React from 'react';

const GovernmentOfficerView = ({ requests, verifyRequest }) => {
  return (
    <div>
      <h3>Government Officer View: Verify Documents</h3>
      <table>
        <thead>
          <tr>
            <th>Student Wallet</th>
            <th>Document</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.walletAddress}</td>
              <td>{request.document}</td>
              <td>
                <button onClick={() => verifyRequest(index)}>Verify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GovernmentOfficerView;
