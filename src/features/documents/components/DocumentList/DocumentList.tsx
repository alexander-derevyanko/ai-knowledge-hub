import DocumentCard from '../../../../components/DocumentCard/DocumentCard';
import type { Document } from '../../../../types/document';
import './DocumentList.css';

interface DocumentListProps {
  documents: Document[];
}

export default function DocumentList({ documents }: DocumentListProps) {
  return (
    <section className="document-list">
      <div className="document-list__toolbar">
        <p className="document-list__count">
          {documents.length} {documents.length === 1 ? 'document' : 'documents'}
        </p>

        <span className="document-list__hint">Results update automatically</span>
      </div>

      {documents.length > 0 ? (
        <div className="document-list__items">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <div className="document-list__empty">
          <h2>No documents found</h2>
          <p>Try changing your search or category filters.</p>
        </div>
      )}
    </section>
  );
}
