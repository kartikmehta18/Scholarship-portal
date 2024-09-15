import React, { useState } from 'react';
import { submitRequest } from '../tezos/tezos';

const Student = () => {
  const [docHash, setDocHash] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the request for verification
    await submitRequest(docHash);
  };

  return (
    <div>
      <h2 className='text-black' >Student: Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Document Hash"
          value={docHash}
          onChange={(e) => setDocHash(e.target.value)}
        />
        <button type="submit" className='text-black'>Request Verification</button>
      </form>
    </div>
  );
};

export default Student;
