export interface ChatMessageItem {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  sources?: string[];
  hasError?: boolean;
}

export interface ChatResponse {
  id: string;
  content: string;
  timestamp: string;
  sources: string[];
}
