import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useWallet } from '../contexts/WalletContext';

const Top: React.FC = () => {
  const navigate = useNavigate();
  const { connectWallet } = useWallet();

  const handleConnectWallet = async () => {
    // Wallet接続
    await connectWallet();

    // 画面遷移
    navigate('/game');
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <button onClick={handleConnectWallet} className="mt-4 bg-blue-500 text-white p-4 rounded-lg">
        Connect Wallet
      </button>
    </div>
  );
};

export default Top;
