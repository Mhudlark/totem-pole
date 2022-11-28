import type { ChatMessage, User } from '@/sharedTypes';

export type InitChatMessage = (
  messageId: string,
  message: string,
  author: User
) => ChatMessage;

export const initChatMessage: InitChatMessage = (
  messageId,
  message,
  author
) => ({
  messageId,
  message,
  author,
});
