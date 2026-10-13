import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { mockChatService } from '../services/mockChatService';
import { useChat } from './useChat';
import type { ChatResponse } from '../types/chat';

vi.mock('../services/mockChatService.ts', () => ({
  mockChatService: vi.fn(),
}));

describe('useChat', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should add a custom message when sending', async () => {
    vi.mocked(mockChatService).mockResolvedValue({
      id: 'ai-1',
      content: 'AI response',
      timestamp: new Date().toISOString(),
      sources: [],
    });

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.messages[0]).toMatchObject({
      content: 'Hello',
      sender: 'user',
    });
  });

  it('should set isLoading to true when sending a message', async () => {
    let resolveRequest!: (value: ChatResponse) => void;

    vi.mocked(mockChatService).mockImplementation(
      () => new Promise((resolve) => (resolveRequest = resolve)),
    );

    const { result } = renderHook(() => useChat());

    let request!: Promise<void>;

    await act(async () => {
      request = result.current.sendMessage('Hello');
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolveRequest({
        id: 'ai-1',
        content: 'AI response',
        timestamp: new Date().toISOString(),
        sources: [],
      });

      await request;
    });
  });

  it('should add AI response message after sending a message', async () => {
    vi.mocked(mockChatService).mockResolvedValue({
      id: 'ai-1',
      content: 'AI response',
      timestamp: new Date().toISOString(),
      sources: [],
    });

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.messages[1]).toMatchObject({
      content: 'AI response',
      sender: 'assistant',
    });
  });

  it('should reset isLoading after error in AI response', async () => {
    vi.mocked(mockChatService).mockRejectedValue(new Error('AI service error'));

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.isLoading).toBe(false);
  });
});
