import React, { useState } from 'react';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for uploading document
    console.log("Document Uploaded: ", file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Document</button>
    </form>
  );
};

export default DocumentUpload;
