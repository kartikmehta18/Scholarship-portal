// // import React, { useState } from 'react';
// // import DocumentUpload from './components/DocumentUpload';
// // import GovernmentVerification from './components/GovernmentVerification';
// // import FinancerRelease from './components/FinancerRelease';

// // const App = () => {
// //   const [contractAddress, setContractAddress] = useState('');
// //   const [studentAddress, setStudentAddress] = useState('');

// //   // 0x8EaE7cE0b788a16D4655d4963c1c817A1C45bF25

// //   return (
// //     <div>
// //       <h2>Scholarship Platform</h2>
// //       <input
// //         type="text"
// //         placeholder="Enter Contract Address"
// //         value={contractAddress}
// //         onChange={(e) => setContractAddress(e.target.value)}
// //       />
// //       <input
// //         type="text"
// //         placeholder="Enter Student Address"
// //         value={studentAddress}
// //         onChange={(e) => setStudentAddress(e.target.value)}
// //       />

// //       <h3>Upload Documents</h3>
// //       <DocumentUpload />

// //       <h3>Government Verification</h3>
// //       <GovernmentVerification contractAddress={contractAddress} studentAddress={studentAddress} />

// //       <h3>Financer Release</h3>
// //       <FinancerRelease contractAddress={contractAddress} studentAddress={studentAddress} />
// //     </div>
// //   );
// // };

// // export default App;


// import React, { useState } from 'react';
// import DocumentUpload from './components/DocumentUpload';
// import GovernmentVerification from './components/GovernmentVerification';
// import FinancerRelease from './components/FinancerRelease';
// import React from 'react';
// import RoleSwitcher from './components/RoleSwitcher';


// const App = () => {
//   const [contractAddress, setContractAddress] = useState('');
//   const [studentAddress, setStudentAddress] = useState('');

//   return (
//     <div>
//       <h2>Scholarship Platform</h2>
//       <input
//         type="text"
//         placeholder="Enter Contract Address"
//         value={contractAddress}
//         onChange={(e) => setContractAddress(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter Student Address"
//         value={studentAddress}
//         onChange={(e) => setStudentAddress(e.target.value)}
//       />

//       <h3>Upload Documents</h3>
//       <DocumentUpload />

//       <h3>Government Verification</h3>
//       <GovernmentVerification contractAddress={contractAddress} studentAddress={studentAddress} />

//       <h3>Financer Release</h3>
//       <FinancerRelease contractAddress={contractAddress} studentAddress={studentAddress} />
//     </div>
//   );
// };

// export default App;


/*

import React, { useState, useEffect } from 'react';
import { connectWallet, getActiveAccount } from './tezos/tezos'; // Add your Tezos connection logic here

const App = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [role, setRole] = useState('student');  // Default role is student
  const [requests, setRequests] = useState([]); // List of student requests
  const [verifiedRequests, setVerifiedRequests] = useState([]); // List of verified requests

  const governmentAddress = '0xDDc8eCFb84E38649576f4BeF06b770D5B011928E';
  const financerAddress = '0xdD2FD4581271e230360230F9337D5c0430Bf44C0';

  // Check the wallet address and assign role
  useEffect(() => {
    const assignRole = async () => {
      const account = await getActiveAccount();
      if (account) {
        setWalletAddress(account.address);

        if (account.address === governmentAddress) {
          setRole('government');
        } else if (account.address === financerAddress) {
          setRole('financer');
        } else {
          setRole('student');
        }
      }
    };

    assignRole();
  }, []);

  // Render different UIs based on the role
  return (
    <div>
      <h2>Government Scholarship DApp</h2>
      <p>Connected wallet: {walletAddress}</p>
      <p>Role: {role}</p>

      {role === 'student' && <StudentView requests={requests} setRequests={setRequests} />}
      {role === 'government' && <GovernmentOfficerView requests={requests} setVerifiedRequests={setVerifiedRequests} />}
      {role === 'financer' && <FinancerView verifiedRequests={verifiedRequests} />}
    </div>
  );
};

// Student View
const StudentView = ({ requests, setRequests }) => {
  const [doc, setDoc] = useState('');

  const handleSubmitRequest = () => {
    const newRequest = {
      walletAddress: '0xYourStudentWalletAddress', // In practice, use connected wallet address
      doc,
      verified: false,
    };
    setRequests([...requests, newRequest]);
    console.log('Request sent:', newRequest);
  };

  return (
    <div>
      <h3>Submit Document for Verification</h3>
      <input type="text" placeholder="Document link" value={doc} onChange={(e) => setDoc(e.target.value)} />
      <button onClick={handleSubmitRequest}>Submit for Verification</button>
    </div>
  );
};

// Government Officer View
const GovernmentOfficerView = ({ requests, setVerifiedRequests }) => {
  const handleVerifyRequest = (index) => {
    const verifiedRequest = { ...requests[index], verified: true };
    setVerifiedRequests((prev) => [...prev, verifiedRequest]);
  };

  return (
    <div>
      <h3>Verify Documents</h3>
      <table>
        <thead>
          <tr>
            <th>Student Wallet</th>
            <th>Document</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.walletAddress}</td>
              <td>{request.doc}</td>
              <td>
                <button onClick={() => handleVerifyRequest(index)}>Verify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Financer View
const FinancerView = ({ verifiedRequests }) => {
  const handleReleaseFunds = (index) => {
    const request = verifiedRequests[index];
    console.log(`Funds released to: ${request.walletAddress}`);
    // Add your fund release logic here
  };

  return (
    <div>
      <h3>Release Funds</h3>
      <table>
        <thead>
          <tr>
            <th>Student Wallet</th>
            <th>Document</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {verifiedRequests.map((request, index) => (
            <tr key={index}>
              <td>{request.walletAddress}</td>
              <td>{request.doc}</td>
              <td>
                <button onClick={() => handleReleaseFunds(index)}>Release 0.1 ETH</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;


*/


import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import StudentView from './components/StudentView';
import GovernmentOfficerView from './components/GovernmentOfficerView';
import FinancerView from './components/FinancerView';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [role, setRole] = useState('student'); // Default role is student
  const governmentAddress = '0xDDc8eCFb84E38649576f4BeF06b770D5B011928E';
  const financerAddress = '0xdD2FD4581271e230360230F9337D5c0430Bf44C0';

  // Function to connect to MetaMask wallet
  const connectWallet = async () => {

    
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log('Requesting wallet connection...');
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log('Connected wallet address:', address); // Log the wallet address
        setWalletAddress(address);

        
  
        // Check the role based on the wallet address
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

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log('Auto-connected wallet:', accounts[0]);
        } else {
          console.log('No wallet connected');
        }
      });
    }
  }, []);

  useEffect(() => {
    // Check if MetaMask is already connected on page load
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          if (accounts[0] === governmentAddress) {
            setRole('government');
          } else if (accounts[0] === financerAddress) {
            setRole('financer');
          } else {
            setRole('student');
          }
        }
      });
    }
  }, []);

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
          {role === 'student' && <StudentView />}
          {role === 'government' && <GovernmentOfficerView />}
          {role === 'financer' && <FinancerView />}
        </div>
      )}
    </div>
  );
};

export default App;
