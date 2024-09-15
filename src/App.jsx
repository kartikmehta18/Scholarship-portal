


import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import StudentView from './components/StudentView';
import GovernmentOfficerView from './components/GovernmentOfficerView';
import FinancerView from './components/FinancerView';
import { ExampleNavbarOne } from './components/Navbar'; // Assuming you have this Navbar component
import Card from './components/Card';


const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [role, setRole] = useState('student'); // Default role is student
  const [studentRequests, setStudentRequests] = useState(() => {
    const savedRequests = localStorage.getItem('studentRequests');
    return savedRequests ? JSON.parse(savedRequests) : [];
  });
  const [verifiedRequests, setVerifiedRequests] = useState(() => {
    const savedVerified = localStorage.getItem('verifiedRequests');
    return savedVerified ? JSON.parse(savedVerified) : [];
  });
  const governmentAddress = '0xDDc8eCFb84E38649576f4BeF06b770D5B011928E';
  const financerAddress = '0xdD2FD4581271e230360230F9337D5c0430Bf44C0';

  // Connect MetaMask wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);

        // Assign role based on wallet address
        if (address === governmentAddress) {
          setRole('government');
        } else if (address === financerAddress) {
          setRole('financer');
        } else {
          setRole('student');
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
    }
  };

  // Store student and verified requests in localStorage when they change
  useEffect(() => {
    localStorage.setItem('studentRequests', JSON.stringify(studentRequests));
  }, [studentRequests]);

  useEffect(() => {
    localStorage.setItem('verifiedRequests', JSON.stringify(verifiedRequests));
  }, [verifiedRequests]);

  // Function to submit a request (student -> government officer)
  const submitRequest = (document) => {
    const newRequest = { walletAddress, document, verified: false };
    setStudentRequests([...studentRequests, newRequest]);
  };

  // Function to verify a request (government officer -> financer)
  const verifyRequest = (index) => {
    const verifiedRequest = { ...studentRequests[index], verified: true };
    setVerifiedRequests([...verifiedRequests, verifiedRequest]);

    // Remove the request from studentRequests after verification
    setStudentRequests(studentRequests.filter((_, i) => i !== index));
  };

  // Function to send tokens (financer -> student)
  const sendTokens = async (index) => {
    const request = verifiedRequests[index];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      const tx = await signer.sendTransaction({
        to: request.walletAddress,
        value: ethers.utils.parseEther("0.001"), // Sending 0.001 ETH
      });

      await tx.wait();
      console.log(`Tokens sent to ${request.walletAddress}`);

      // Remove the verified request after tokens are sent
      setVerifiedRequests(verifiedRequests.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error sending tokens:', error);
    }
  };

  return (
    <>
    <div>
      {/* Navbar */}
      <ExampleNavbarOne />

      {/* MetaMask Wallet Connect */}
      {!walletAddress ? (
        <button className="btn p-2 border rounded-md mr-72 text-white absolute right-4 top-5"
        
        onClick={connectWallet}
        
        >
        <svg
          class="sparkle"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          fill="#FFFFFF"
          width="24"
          height="24"
        >
          <path
            clip-rule="evenodd"
            d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z"
            fill-rule="evenodd"
          ></path>
          <path
            clip-rule="evenodd"
            d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z"
            fill-rule="evenodd"
          ></path>
        </svg>
      
        <span class="text">Connect</span>
      </button>
      
       
      ) : (
        <div className='  flex flex-col items-center mt-8 border-2 border-black ml-80 rounded-md mr-80 text-black'>
          <p className='bg-black text-white p-2 rounded-md  shadow-md  hover:shadow-md shadow-blue-600 cursor-pointer  mt-4'>Connected wallet: {walletAddress}</p>
          <p className=''>Role: {role}</p>
          <button 
            className="bg-red-500 p-2 border rounded-md text-white"
            onClick={() => setWalletAddress(null)}
          >
           🚫 Disconnect
          </button>

          {/* Role-Based Views */}
          {role === 'student' && <StudentView submitRequest={submitRequest} className='text-black'/>}
          {role === 'government' && <GovernmentOfficerView requests={studentRequests} verifyRequest={verifyRequest} className='text-black' />}
          {role === 'financer' && <FinancerView requests={verifiedRequests} sendTokens={sendTokens} className='text-black'/>}
        </div>
      )}
   
    </div>
    {/* <Card /> */}
    </>
  );
};

export default App;
