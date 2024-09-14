// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import StudentView from './components/StudentView';
// import GovernmentOfficerView from './components/GovernmentOfficerView';
// import FinancerView from './components/FinancerView';

// const App = () => {
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [role, setRole] = useState('student'); // Default role is student
//   const [studentRequests, setStudentRequests] = useState([]); // List of student requests
//   const [verifiedRequests, setVerifiedRequests] = useState([]); // List of verified requests
//   const governmentAddress = '0xDDc8eCFb84E38649576f4BeF06b770D5B011928E';
//   const financerAddress = '0xdD2FD4581271e230360230F9337D5c0430Bf44C0';

//   // Connect MetaMask
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//         const signer = provider.getSigner();
//         const address = await signer.getAddress();
//         setWalletAddress(address);

//         if (address === governmentAddress) {
//           setRole('government');
//         } else if (address === financerAddress) {
//           setRole('financer');
//         } else {
//           setRole('student');
//         }
//       } catch (error) {
//         console.error('Error connecting to MetaMask:', error);
//       }
//     } else {
//       alert('MetaMask is not installed. Please install MetaMask and try again.');
//     }
//   };

//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
//         if (accounts.length > 0) {
//           setWalletAddress(accounts[0]);
//           if (accounts[0] === governmentAddress) {
//             setRole('government');
//           } else if (accounts[0] === financerAddress) {
//             setRole('financer');
//           } else {
//             setRole('student');
//           }
//         }
//       });
//     }
//   }, []);

//   // Function to submit a request (student -> government officer)
//   const submitRequest = (document) => {
//     setStudentRequests([...studentRequests, { walletAddress, document }]);
//   };

//   // Function to verify a request (government officer -> financer)
//   const verifyRequest = (index) => {
//     const verifiedRequest = studentRequests[index];
//     setVerifiedRequests([...verifiedRequests, verifiedRequest]);

//     // Remove the request from the government officer's table
//     setStudentRequests(studentRequests.filter((_, i) => i !== index));
//   };

//   // Function to send tokens (financer -> student)
//   const sendTokens = async (index) => {
//     const request = verifiedRequests[index];
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();

//     try {
//       // Sending 0.1 ETH to the student's address
//       const tx = await signer.sendTransaction({
//         to: request.walletAddress,
//         value: ethers.utils.parseEther("0.1"), // Sending 0.1 ETH
//       });

//       await tx.wait();
//       console.log(`Tokens sent to ${request.walletAddress}`);

//       // Remove the verified request from the table after sending tokens
//       setVerifiedRequests(verifiedRequests.filter((_, i) => i !== index));
//     } catch (error) {
//       console.error('Error sending tokens:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Scholarship DApp</h1>
//       {!walletAddress ? (
//         <button onClick={connectWallet}>Connect Wallet</button>
//       ) : (
//         <div>
//           <p>Connected wallet: {walletAddress}</p>
//           <p>Role: {role}</p>
//           <button onClick={() => setWalletAddress(null)}>Disconnect</button>

//           {role === 'student' && <StudentView submitRequest={submitRequest} />}
//           {role === 'government' && <GovernmentOfficerView requests={studentRequests} verifyRequest={verifyRequest} />}
//           {role === 'financer' && <FinancerView requests={verifiedRequests} sendTokens={sendTokens} />}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import StudentView from './components/StudentView';
import GovernmentOfficerView from './components/GovernmentOfficerView';
import FinancerView from './components/FinancerView';

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

  // Connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);

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

  // Store student requests and verified requests in localStorage whenever they change
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

    // Remove the request from the government officer's table
    setStudentRequests(studentRequests.filter((_, i) => i !== index));
  };

  // Function to send tokens (financer -> student)
  const sendTokens = async (index) => {
    const request = verifiedRequests[index];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      // Sending 0.1 ETH to the student's address
      const tx = await signer.sendTransaction({
        to: request.walletAddress,
        value: ethers.utils.parseEther("0.001"), // Sending 0.1 ETH
      });

      await tx.wait();
      console.log(`Tokens sent to ${request.walletAddress}`);

      // Remove the verified request from the table after sending tokens
      setVerifiedRequests(verifiedRequests.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error sending tokens:', error);
    }
  };

  return (
    <div>
      <h1>Scholarship DApp</h1>
      {!walletAddress ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected wallet: {walletAddress}</p>
          <p>Role: {role}</p>
          <button onClick={() => setWalletAddress(null)}>Disconnect</button>

          {/* Render role-based views */}
          {role === 'student' && <StudentView submitRequest={submitRequest} />}
          {role === 'government' && <GovernmentOfficerView requests={studentRequests} verifyRequest={verifyRequest} />}
          {role === 'financer' && <FinancerView requests={verifiedRequests} sendTokens={sendTokens} />}
        </div>
      )}
    </div>
  );
};

export default App;



