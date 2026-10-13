import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DocumentsPage from './DocumentsPage';

const { TEST_DOCUMENTS } = vi.hoisted(() => ({
  TEST_DOCUMENTS: [
    {
      id: 'doc-1',
      title: 'React Architecture Guide',
      category: 'architecture',
      type: 'pdf',
      size: '1 MB',
      status: 'ready',
      updatedAt: '2026-01-15T10:00:00.000Z',
    },
    {
      id: 'doc-2',
      title: 'React Hooks Guide',
      category: 'development',
      type: 'pdf',
      size: '2 MB',
      status: 'ready',
      updatedAt: '2026-01-14T10:00:00.000Z',
    },
    {
      id: 'doc-3',
      title: 'Product Strategy',
      category: 'product',
      type: 'pdf',
      size: '3 MB',
      status: 'ready',
      updatedAt: '2026-01-13T10:00:00.000Z',
    },
  ],
}));

vi.mock('../../data/documents', () => ({
  DOCUMENTS: TEST_DOCUMENTS,
}));

describe('DocumentsPage', () => {
  it('renders the page heading', () => {
    render(<DocumentsPage />);

    expect(screen.getByRole('heading', { name: 'Documents' })).toBeInTheDocument();
  });

  it('filters documents by search query', async () => {
    const user = userEvent.setup();

    render(<DocumentsPage />);

    await user.type(screen.getByTestId('documents-search'), 'React');

    const documentList = within(screen.getByTestId('document-list'));

    expect(documentList.getByText('React Architecture Guide')).toBeInTheDocument();
    expect(documentList.getByText('React Hooks Guide')).toBeInTheDocument();
    expect(documentList.queryByText('Product Strategy')).not.toBeInTheDocument();
    expect(documentList.getByText('2 documents')).toBeInTheDocument();
  });

  it('shows an empty state when no documents match the search', async () => {
    const user = userEvent.setup();

    render(<DocumentsPage />);

    await user.type(screen.getByTestId('documents-search'), 'Nonexistent document');

    const documentList = within(screen.getByTestId('document-list'));

    expect(documentList.getByRole('heading', { name: 'No documents found' })).toBeInTheDocument();

    expect(documentList.queryByText('React Architecture Guide')).not.toBeInTheDocument();
  });
});
