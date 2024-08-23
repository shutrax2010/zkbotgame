import React, { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { modes, ModeType } from '../utils/types/modes';

interface ChatInputHelperProps {
  mode: ModeType;
  message: string;
  className?: string;
}

const ChatInputHelper: React.FC<ChatInputHelperProps> = ({ mode, message, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandQuestion = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div
      className={`flex overflow-hidden ${className}`}
      style={{
        maxHeight: isExpanded ? '50vh' : '32px',
        transition: 'max-height 0.3s ease'
      }}
    >
      {/* モード表示 */}
      <div className="flex w-1/5 items-end">
        <div className={`flex flex-1 h-8 justify-center ${modes[mode].bgColor}`}>
          <p className="text-white px-2 py-1">{modes[mode].modeLabel}</p>
        </div>
      </div>

      {/* 問題表示 */}
      <div
        className="flex flex-1 bg-gray-600 whitespace-pre-wrap cursor-pointer overflow-y-auto"
        onClick={handleExpandQuestion}
      >
        <p className="flex-1 p-1 px-2 text-white">{message}</p>

        {/* 矢印マーク */}
        {isExpanded ? (
          <ExpandMoreIcon className="mx-2 mt-1 text-white" />
        ) : (
          <ExpandLessIcon className="mx-2 mt-1 text-white" />
        )}
      </div>
    </div>
  );
};

export default ChatInputHelper;
