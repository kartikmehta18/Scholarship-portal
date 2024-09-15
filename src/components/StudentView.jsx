import React, { useState } from 'react';

const StudentView = ({ submitRequest }) => {
  const [document, setDocument] = useState('');

  const handleSubmit = () => {
    submitRequest(document);
    setDocument(''); // Clear the document input field
  };

  return (
    <div className='mt-4 mb-4'>
      <h3 className='text-black text-xl mt-2'>Student View: Submit Document</h3>
      <div className='mt-4'>
      <input
      className='p-2 border-1 rounded-md'
        type="text"
        placeholder="Document URL"
        value={document}
        onChange={(e) => setDocument(e.target.value)}
      />
      <button 
      className='p-2 bg-gray-950 ml-4 rounded-md '
      onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default StudentView;
