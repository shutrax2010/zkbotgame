export type ModeType = 'question' | 'answer';

export interface ModeConfig {
  modeLabel: string;
  buttonLabel: string;
  messageType: 'chat' | 'answer';
  bgColor: string;
}

export const modes: Record<ModeType, ModeConfig> = {
  question: {
    modeLabel: 'Question-mode',
    buttonLabel: 'Q',
    messageType: 'chat',
    bgColor: 'bg-blue-500'
  },
  answer: {
    modeLabel: 'Answer-mode',
    buttonLabel: 'A',
    messageType: 'answer',
    bgColor: 'bg-red-500'
  }
};
