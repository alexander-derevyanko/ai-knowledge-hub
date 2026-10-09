import { lazy, Suspense, useState, type ChangeEvent } from 'react';
import { DOCUMENTS } from '../../data/documents';
import DocumentList from './components/DocumentList/DocumentList';
import DocumentFilters from './components/DocumentFilters/DocumentFilters';
import './DocumentsPage.css';
import { DocCategory, DocSortOption, DocStatus } from '../../types/document';
import type { Document, DocumentUploadFormValues } from '../../types/document';
import { getDocType } from '../../utils/getDocType';
import { formatFileSize } from '../../utils/formatFileSize';
import { isEnumValue } from '../../utils/isEnumValue';

const DocumentUploadModal = lazy(
  () => import('./components/DocumentUploadModal/DocumentUploadModal'),
);

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocCategory | ''>('');
  const [sortOption, setSortOption] = useState(DocSortOption.Newest);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>(DOCUMENTS);

  const visibleDocuments = documents
    .filter(({ title, category }) => {
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? category === selectedCategory : true;

      return matchesSearch && matchesCategory;
    })
    .sort((docA, docB) => {
      switch (sortOption) {
        case DocSortOption.Newest:
          return new Date(docB.updatedAt).getTime() - new Date(docA.updatedAt).getTime();

        case DocSortOption.Oldest:
          return new Date(docA.updatedAt).getTime() - new Date(docB.updatedAt).getTime();

        case DocSortOption.TitleAsc:
          return docA.title.localeCompare(docB.title);

        case DocSortOption.TitleDesc:
          return docB.title.localeCompare(docA.title);

        default:
          return 0;
      }
    });

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectedCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (isEnumValue(DocCategory, value)) {
      setSelectedCategory(value);
    }
  };

  const handleSortOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (isEnumValue(DocSortOption, value)) {
      setSortOption(value);
    }
  };

  const handleDocumentUpload = (data: DocumentUploadFormValues) => {
    const type = getDocType(data.file[0].name);

    if (!type) {
      return;
    }

    const newDocument: Document = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      category: data.category,
      type,
      size: formatFileSize(data.file[0].size),
      status: DocStatus.Ready,
      updatedAt: new Date().toISOString(),
    };

    setIsUploadModalOpen(false);

    setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
  };

  return (
    <div className="documents">
      <header className="documents__header">
        <div>
          <h1>Documents</h1>
          <button className="documents__upload-button" onClick={() => setIsUploadModalOpen(true)}>
            Upload Document
          </button>
        </div>
        <p>Manage and browse your knowledge base</p>
      </header>

      <DocumentFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        sortOption={sortOption}
        handleSearchQuery={handleSearchQuery}
        handleSelectedCategory={handleSelectedCategory}
        handleSortOption={handleSortOption}
      />

      <DocumentList documents={visibleDocuments} />

      {isUploadModalOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <DocumentUploadModal
            onClose={() => setIsUploadModalOpen(false)}
            onSubmitDoc={handleDocumentUpload}
          />
        </Suspense>
      )}
    </div>
  );
}
