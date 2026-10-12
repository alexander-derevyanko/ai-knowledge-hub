import { useState } from 'react';
import './ChatPage.css';
import ChatMessage from './components/ChatMessage/ChatMessage';
import { useChat } from './hooks/useChat';

export default function ChatPage() {
  const { messages, isLoading, sendMessage, retryMessage } = useChat();

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const question = inputValue.trim();

    if (!question || isLoading) {
      return;
    }

    setInputValue('');

    await sendMessage(question);
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
              retry={() => retryMessage(message.id)}
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
        <form className="chat-page__form" onSubmit={handleSubmit}>
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
