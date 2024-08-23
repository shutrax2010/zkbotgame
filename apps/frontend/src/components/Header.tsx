import React from 'react';

import { useWallet } from '../contexts/WalletContext';
import viteLogo from '/vite.svg';

const Header: React.FC = () => {
  const { publicKey, isConnected } = useWallet();

  return (
    <div
      className="
        h-14 bg-brandColor text-white
        p-2 pl-4 pr-4
        flex flex-row
        justify-between items-center
      "
    >
      {/* TODO: 差し替え */}
      {/* ロゴ/タイトル */}
      <div className="flex flex-row">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <p className="text-2xl ml-2">ZKP</p>
      </div>

      {/* Auroのpublic address*/}
      <div className="wallet-id">
        <p className="text-1xl">public addless: {isConnected ? publicKey : 'Not connected'}</p>
      </div>
    </div>
  );
};

export default Header;
