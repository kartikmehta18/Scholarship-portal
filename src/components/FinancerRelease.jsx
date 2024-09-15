import React from 'react';
import { connectWallet, interactWithContract } from '../tezos/tezos';

const FinancerRelease = ({ contractAddress, studentAddress }) => {
  const handleRelease = async () => {
    console.log('Release button clicked');  // Debugging statement
    await connectWallet();
    console.log('Wallet connected');  // Debugging statement
    await interactWithContract(contractAddress, studentAddress);
    console.log('Funds released');  // Debugging statement
  };

  return (
    <div>
      <button onClick={handleRelease} className='text-black'>Release Funds</button>
    </div>
  );
};

export default FinancerRelease;
