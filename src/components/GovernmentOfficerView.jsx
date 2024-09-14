import React from 'react';

const GovernmentOfficerView = () => {
  const handleVerify = (requestId) => {
    console.log('Verified document for request ID:', requestId);
    // Add logic to verify document
  };

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
          <tr>
            <td>0x123456789...abc</td>
            <td>Document Link</td>
            <td>
              <button onClick={() => handleVerify(1)}>Verify</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GovernmentOfficerView;
