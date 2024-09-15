import React, { useState, useEffect } from 'react';
import { connectWallet, getConnectedAddress } from '../tezos/tezos';
import Student from './Student';
import GovernmentOfficer from './GovernmentOfficer';
import Financer from './Financer';

const GOVERNMENT_WALLET = '0xDDc8eCFb84E38649576f4BeF06b770D5B011928E';
const FINANCER_WALLET = '0xdD2FD4581271e230360230F9337D5c0430Bf44C0';

const RoleSwitcher = () => {
  const [role, setRole] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const checkWalletAddress = async () => {
      await connectWallet();
      const address = await getConnectedAddress();
      setWalletAddress(address);

      if (address === GOVERNMENT_WALLET) {
        setRole('government');
      } else if (address === FINANCER_WALLET) {
        setRole('financer');
      } else {
        setRole('student');
      }
    };
    checkWalletAddress();
  }, []);

  return (
    <div >
      {role === 'student' && <Student className='text-black' />}
      {role === 'government' && <GovernmentOfficer className='text-black' />}
      {role === 'financer' && <Financer className='text-black'/>}
    </div>
  );
};

export default RoleSwitcher;
