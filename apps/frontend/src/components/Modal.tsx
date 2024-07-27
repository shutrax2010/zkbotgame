import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

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
      <div className="relative flex flex-col justify-center items-center w-1/2 h-5/6 bg-white p-6 rounded shadow-lg">
        {/* 閉じるアイコン */}
        <CloseIcon className="absolute top-4 left-4 cursor-pointer text-gray-700" onClick={onClose} />

        {/* メッセージ */}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
