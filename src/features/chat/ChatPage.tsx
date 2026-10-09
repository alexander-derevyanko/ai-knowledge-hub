import { useState } from 'react';
import './ChatPage.css';
import type { ChatMessageItem } from './types/chat';
import ChatMessage from './components/ChatMessage/ChatMessage';
import { mockChatService } from './services/mockChatService';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const simulateAIResponse = async (newMessage: ChatMessageItem) => {
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

  const handleSendMessage = async () => {
    const question = inputValue.trim();

    if (question === '') {
      return;
    }

    const newMessage: ChatMessageItem = {
      id: crypto.randomUUID(),
      content: question,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue('');

    await simulateAIResponse(newMessage);
  };

  const handleRetry = async (messageId: string) => {
    const failedMessage = messages.find((message) => message.id === messageId);

    if (!failedMessage || isLoading) {
      return;
    }

    const retryMessage: ChatMessageItem = {
      ...failedMessage,
      hasError: false,
    };

    setMessages((prevMessages) =>
      prevMessages.map((message) => (message.id === messageId ? retryMessage : message)),
    );

    await simulateAIResponse(retryMessage);
  };

  return (
    <div className="chat-page">
      <header className="chat-page__header">
        <div className="chat-page__avatar" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="4" y="7" width="16" height="12" rx="4" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 4v3M8 3l1 2M16 3l-1 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="9" cy="12" r="1" fill="currentColor" />
            <circle cx="15" cy="12" r="1" fill="currentColor" />
          </svg>
        </div>

        <div className="chat-page__heading">
          <h1>AI Assistant</h1>
          <p>Ask questions about your knowledge base</p>
        </div>
      </header>

      <section className="chat-page__chat" aria-label="Chat interface">
        <div className="chat-page__messages">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLoading={false}
              retry={() => handleRetry(message.id)}
            />
          ))}

          {isLoading && (
            <ChatMessage
              key="assistant-loading"
              message={{
                id: 'assistant-loading',
                content: '',
                sender: 'assistant',
                timestamp: new Date().toISOString(),
              }}
              isLoading={true}
            />
          )}
        </div>
      </section>

      <footer className="chat-page__footer">
        <form
          className="chat-page__form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Ask a question..."
            aria-label="Ask a question"
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2 11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m22 2-7 20-4-9-9-4 20-7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  );
}
