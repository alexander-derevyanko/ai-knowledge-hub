import './MessageSource.css';

interface MessageSourceProps {
  source: string;
}

export default function MessageSource({ source }: MessageSourceProps) {
  return (
    <li className="chat-page__source-item">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 9h6M9 13h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>

      <span>{source}</span>
    </li>
  );
}
