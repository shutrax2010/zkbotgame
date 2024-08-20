import React from 'react';

interface ButtonProps {
  isPrimary?: boolean;
  value: string;
  className?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ isPrimary, value, className = '', onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`h-10 p-2 rounded-full text-white ${isPrimary ? 'bg-brandColor' : ''} ${className}`}
    >
      {/* TODO: 背景色をデフォルトでbg-gray-600に、親から渡されるclassNameで指定がある場合はその色になるように修正 */}
      <span>{value}</span>
    </button>
  );
};

export default Button;
