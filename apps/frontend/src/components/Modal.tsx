import React from 'react';

interface ModalProps {
  message: string | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <div className="flex flex-col justify-center items-center w-1/2 h-5/6 bg-white p-6 rounded shadow-lg">
        <p>{message}</p>
        <button onClick={onClose} className="mt-4 p-2 bg-blue-500 text-white rounded">
          閉じる
        </button>
      </div>
    </div>
  );
};

export default Modal;
