import React, { useEffect, useState } from 'react';
import { fetchVerifiedRequests, releaseFunds } from '../tezos/tezos';

const Financer = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadVerifiedRequests = async () => {
      const verifiedRequests = await fetchVerifiedRequests();
      setRequests(verifiedRequests);
    };
    loadVerifiedRequests();
  }, []);

  const handleRelease = async (studentAddress) => {
    await releaseFunds(studentAddress, 0.1);  // Releasing 0.1 ETH
  };

  return (
    <div>
      <h2>Financer: Release Funds</h2>
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
                <button onClick={() => handleRelease(request.studentAddress)}>
                  Release Funds
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Financer;
