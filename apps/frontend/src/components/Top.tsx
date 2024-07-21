import React from 'react';
import { useNavigate } from 'react-router-dom';

const Top: React.FC = () => {
  const navigate = useNavigate();

  const goToGame = () => {
    navigate('/game');
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <button onClick={goToGame} className="mt-4 bg-blue-500 text-white p-4 rounded-lg">
        Connect Wallet
      </button>
    </div>
  );
};

export default Top;