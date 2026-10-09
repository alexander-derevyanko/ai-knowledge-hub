import type { ChatResponse } from '../types/chat';

export function mockChatService(userMessage: string): Promise<ChatResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.5;

      if (shouldFail) {
        reject(new Error('Mock API error: Something went wrong'));

        return;
      }

      const mockResponse: ChatResponse = {
        id: crypto.randomUUID(),
        content: `This is a mock response to the user message: "${userMessage}"`,
        timestamp: new Date().toISOString(),
        sources: ['Source 1', 'Source 2', 'Source 3'],
      };

      resolve(mockResponse);
    }, 2000);
  });
}
