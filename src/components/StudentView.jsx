import React, { useState } from 'react';

const StudentView = () => {
  const [document, setDocument] = useState('');

  const handleSubmit = () => {
    console.log('Student submitted document:', document);
    // Add logic to send request for verification
  };

  return (
    <div>
      <h3>Student View: Submit Document</h3>
      <input
        type="text"
        placeholder="Document URL"
        value={document}
        onChange={(e) => setDocument(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default StudentView;
