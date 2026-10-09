import type { Document } from '../../types/document';
import './DocumentCard.css';

interface DocumentCardProps {
  document: Document;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  return (
    <article className="document-card">
      <div className="document-card__main">
        <div className="document-card__title">{document.title}</div>

        <div className="document-card__meta">
          <span>{document.category}</span>
          <span>{document.type}</span>
          <span>{document.size}</span>
          <span>{document.status}</span>
        </div>
      </div>

      <time className="document-card__updated">{document.updatedAt}</time>
    </article>
  );
}
