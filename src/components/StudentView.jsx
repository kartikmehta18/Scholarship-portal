import React, { useState } from 'react';
import axios from 'axios';

const StudentView = ({ submitRequest }) => {
  // const [document, setDocument] = useState('');
  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();
    // console.log(file);
    try {
      const fileData = new FormData();
      fileData.append("file", file);

      const responseData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers:{
          pinata_api_key:  import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
          "Content-Type": "multipart/form-data",

        },
      });

      const fileUrl = "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
      console.log(fileUrl);
      setImgUrl(fileUrl);
      submitRequest(fileUrl); 

    } catch (error) {
      console.log(error)
    }

    // setDocument(''); 
  };

  return (
    <div className='mt-4 mb-4'>
      <h3 className='text-black text-xl mt-2'>Student View: Submit Document</h3>
      <div className='mt-4'>
        <input
          className="p-2 border border-black rounded-md bg-transparent text-black placeholder-black"
          type="file"
          placeholder="Document URL"
          onChange={(e)=> setFile(e.target.files[0])}
        />

        <button 
          className='p-2 bg-gray-950 text-white ml-4 rounded-md'
          onClick={handleSubmit}>
          Submit
        </button>

        <div>
        <img src={imgUrl} alt="your document" height={300} width={300}/>
      </div>
      </div>
    </div>
  );
};

export default StudentView;
