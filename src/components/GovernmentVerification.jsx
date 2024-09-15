import React from 'react';
import { connectWallet, interactWithContract } from '../tezos/tezos';

const GovernmentVerification = ({ contractAddress, studentAddress }) => {
  const handleVerify = async () => {
    console.log('Verify button clicked');  // Debugging statement
    await connectWallet();
    console.log('Wallet connected');  // Debugging statement
    await interactWithContract(contractAddress, studentAddress);
    console.log('Document verified');  // Debugging statement
  };

  return (
    <div>
      <button className='text-black' onClick={handleVerify}>Verify Document</button>
    </div>
  );
};

export default GovernmentVerification;
