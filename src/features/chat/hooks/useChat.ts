import { useState } from 'react';
import type { ChatMessageItem } from '../types/chat';
import { mockChatService } from '../services/mockChatService';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const requestAIResponse = async (newMessage: ChatMessageItem) => {
    setIsLoading(true);

    try {
      const aiResponse = await mockChatService(newMessage.content);

      if (!aiResponse) {
        throw new Error('No response from AI service');
      }

      const aiMessage: ChatMessageItem = {
        id: aiResponse.id,
        content: aiResponse.content,
        sender: 'assistant',
        timestamp: aiResponse.timestamp,
        sources: aiResponse.sources,
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Something went wrong. Please try again.', error);

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === newMessage.id ? { ...message, hasError: true } : message,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    const question = content.trim();

    if (!question || isLoading) {
      return;
    }

    const message: ChatMessageItem = {
      id: crypto.randomUUID(),
      content: question,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);

    await requestAIResponse(message);
  };

  const retryMessage = async (messageId: string) => {
    if (isLoading) {
      return;
    }

    const message = messages.find((item) => item.id === messageId && item.sender === 'user');

    if (!message || !message.hasError) {
      return;
    }

    setMessages((prev) =>
      prev.map((item) => (item.id === messageId ? { ...item, hasError: false } : item)),
    );

    await requestAIResponse(message);
  };

  return { messages, isLoading, sendMessage, retryMessage };
};
