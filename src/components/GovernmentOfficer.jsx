import React, { useEffect, useState } from 'react';
import { fetchPendingRequests, verifyDocument } from '../tezos/tezos';

const GovernmentOfficer = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadRequests = async () => {
      const pendingRequests = await fetchPendingRequests();
      setRequests(pendingRequests);
    };
    loadRequests();
  }, []);

  const handleVerify = async (studentAddress) => {
    await verifyDocument(studentAddress);
  };

  return (
    <div>
      <h2>Government Officer: Verify Documents</h2>
      <table>
        <thead>
          <tr>
            <th>Student Address</th>
            <th>Document Hash</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.studentAddress}</td>
              <td>{request.docHash}</td>
              <td>
                <button onClick={() => handleVerify(request.studentAddress)}>
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GovernmentOfficer;
