import { describe, expect, it, vi } from 'vitest';
import DocumentUploadModal from './DocumentUploadModal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DocumentUploadModal', () => {
  it('should not submit invalid form', async () => {
    const user = userEvent.setup();
    const onSubmitDoc = vi.fn();
    const onClose = vi.fn();

    render(<DocumentUploadModal onClose={onClose} onSubmitDoc={onSubmitDoc} />);

    await user.click(screen.getByRole('button', { name: 'Upload' }));

    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Category is required')).toBeInTheDocument();
    expect(screen.getByText('File is required')).toBeInTheDocument();

    expect(onSubmitDoc).not.toHaveBeenCalled();
  });

  it('does not submit the form when the file format is unsupported', async () => {
    const user = userEvent.setup({ applyAccept: false });
    const onSubmitDoc = vi.fn();
    const onClose = vi.fn();

    render(<DocumentUploadModal onClose={onClose} onSubmitDoc={onSubmitDoc} />);

    await user.type(
      screen.getByRole('textbox', { name: 'Document title *' }),
      'React Architecture Guide',
    );

    await user.selectOptions(screen.getByRole('combobox', { name: 'Category *' }), 'architecture');

    const invalidFile = new File(['invalid content'], 'document.exe', {
      type: 'application/octet-stream',
    });

    await user.upload(screen.getByLabelText('Document file *'), invalidFile);

    await user.click(screen.getByRole('button', { name: 'Upload' }));

    expect(
      await screen.findByText('Invalid file format. Please upload a pdf, docx, txt, md file.'),
    ).toBeInTheDocument();

    expect(onSubmitDoc).not.toHaveBeenCalled();
  });
});
