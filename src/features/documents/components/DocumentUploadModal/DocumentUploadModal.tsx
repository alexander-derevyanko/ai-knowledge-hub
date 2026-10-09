import { useForm } from 'react-hook-form';
import { DocCategory, type DocumentUploadFormValues } from '../../../../types/document';
import './DocumentUploadModal.css';
import { useRef } from 'react';

type DocumentUploadModalProps = {
  onClose: () => void;
  onSubmitDoc: (data: DocumentUploadFormValues) => void;
};

export default function DocumentUploadModal({ onClose, onSubmitDoc }: DocumentUploadModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<DocumentUploadFormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedFile = watch('file')?.[0];

  const { ref: registerFileRef, ...fileRegistration } = register('file', {
    required: 'File is required',
    validate: {
      supportedFormat: (files) => {
        const file = files?.[0];
        const allowedExtensions = ['pdf', 'docx', 'txt', 'md'];

        if (!allowedExtensions.includes(file.name.split('.').pop()?.toLowerCase() || '')) {
          return `Invalid file format. Please upload a ${allowedExtensions.join(', ')} file.`;
        }

        return true;
      },
    },
  });

  const onSubmit = (data: DocumentUploadFormValues) => {
    onSubmitDoc(data);
    reset();
  };

  return (
    <div
      className="document-upload-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
          onClose();
        }
      }}
    >
      <section
        className="document-upload-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-upload-title"
      >
        <button
          className="document-upload-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 id="document-upload-title">Upload document</h2>

        <p className="document-upload-modal__description">
          Add a new document to your knowledge base.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="document-upload-modal__field">
            <label htmlFor="document-title">Document title *</label>
            <input
              {...register('title', {
                required: 'Title is required',
                validate: (value) => value.trim().length > 0 || 'Title cannot be empty',
              })}
              id="document-title"
              type="text"
              placeholder="Enter document title"
              aria-invalid={!!errors.title}
            />

            {errors.title?.message && (
              <span className="document-upload-modal__error">{errors.title.message}</span>
            )}
          </div>

          <div className="document-upload-modal__field">
            <label htmlFor="document-category">Category *</label>
            <select
              {...register('category', { required: 'Category is required' })}
              id="document-category"
              name="category"
              defaultValue=""
              aria-invalid={!!errors.category}
            >
              <option value="">Select category</option>
              <option value={DocCategory.Architecture}>Architecture</option>
              <option value={DocCategory.Development}>Development</option>
              <option value={DocCategory.AI}>AI</option>
              <option value={DocCategory.Product}>Product</option>
              <option value={DocCategory.Business}>Business</option>
              <option value={DocCategory.Security}>Security</option>
            </select>
            {errors.category?.message && (
              <span className="document-upload-modal__error">{errors.category.message}</span>
            )}
          </div>

          <div className="document-upload-modal__field">
            <label htmlFor="document-file">Document file *</label>

            <button
              className={`document-upload-modal__file-picker ${
                errors.file ? 'document-upload-modal__file-picker--error' : ''
              }`}
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="document-upload-modal__file-icon" aria-hidden="true">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 16V4m-5 5 5-5 5 5" />
                  <path d="M20 16.5a4.5 4.5 0 0 0-2.8-4.17A6 6 0 0 0 5.4 10 4 4 0 0 0 5 18h2" />
                </svg>
              </span>

              <span className="document-upload-modal__file-name">
                {selectedFile?.name ?? 'Choose a file...'}
              </span>

              <span className="document-upload-modal__file-hint">
                {selectedFile
                  ? `${(selectedFile.size / 1024).toFixed(2)} KB`
                  : 'PDF, DOCX, TXT, MD'}
              </span>
            </button>

            <input
              {...fileRegistration}
              ref={(element) => {
                registerFileRef(element);
                fileInputRef.current = element;
              }}
              className="document-upload-modal__hidden-input"
              id="document-file"
              type="file"
              accept=".pdf,.docx,.txt,.md"
            />
            {errors.file?.message && (
              <span className="document-upload-modal__error">{errors.file.message}</span>
            )}
          </div>

          <div className="document-upload-modal__actions">
            <button
              className="document-upload-modal__cancel-button"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button className="document-upload-modal__upload-button" type="submit">
              Upload
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
