import type { ChatMessageItem } from '../../types/chat';
import MessageSource from '../MessageSource/MessageSource';
import './ChatMessage.css';

interface ChatMessageProps {
  message: ChatMessageItem;
  isLoading: boolean;
  retry?: () => void;
}

export default function ChatMessage({
  message: { sender, sources, content, timestamp, hasError },
  isLoading,
  retry,
}: ChatMessageProps) {
  const isUser = sender === 'user';
  const sourcesList = sources ?? [];

  return (
    <article className={`chat-page__message chat-page__message--${sender}`}>
      <span className="chat-page__message-sender">{isUser ? 'You' : 'AI'}</span>

      <div className="chat-page__message-bubble">
        {isLoading && !isUser ? (
          <div className="chat-page__loading-indicator" role="status" aria-label="AI is thinking">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2" />
              <path
                d="M22 12a10 10 0 0 1-10 10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <span className="chat-page__loading-text">Thinking...</span>
          </div>
        ) : (
          <p className="chat-page__message-content">{content}</p>
        )}

        {!isLoading && !isUser && sourcesList.length > 0 && (
          <div className="chat-page__message-sources">
            <h3>Sources</h3>

            <ul className="chat-page__source-list">
              {sourcesList.map((source, index) => (
                <MessageSource key={`${source}-${index}`} source={source} />
              ))}
            </ul>
          </div>
        )}

        {!isLoading && (
          <time className="chat-page__message-timestamp" dateTime={timestamp}>
            {new Date(timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>
        )}

        {hasError && (
          <div className="chat-page__message-error" role="alert">
            <p>Something went wrong. Please try again.</p>

            <button
              type="button"
              className="chat-page__message-error-button"
              onClick={retry}
              disabled={!retry}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
