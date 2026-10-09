import { useState } from 'react';
import { DOCUMENTS } from '../../data/documents';
import DocumentList from './components/DocumentList/DocumentList';

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <div className="documents">
      <header className="documents__header">
        <h1>Documents</h1>
        <p>Manage and browse your knowledge base</p>
      </header>
      <p>{DOCUMENTS.length} documents</p>

      {/* TODO: move to the separate component */}
      <div className="filter-block">
        <input value={searchQuery} onChange={handleSearchQuery} />
      </div>

      <DocumentList documents={DOCUMENTS} />
    </div>
  );
}
