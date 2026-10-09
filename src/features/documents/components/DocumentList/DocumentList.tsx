import DocumentCard from '../../../../components/DocumentCard/DocumentCard';
import type { Document } from '../../../../types/document';

interface DocumentListProps {
  documents: Document[];
}

export default function DocumentList({ documents }: DocumentListProps) {
  return documents.length > 0 ? (
    <div>
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  ) : (
    <div>
      No documents yet.
      <br />
      Upload your first document to get started.
    </div>
  );
}
