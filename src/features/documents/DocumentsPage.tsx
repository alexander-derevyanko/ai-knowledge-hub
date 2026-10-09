import { useState, type ChangeEvent } from 'react';
import { DOCUMENTS } from '../../data/documents';
import DocumentList from './components/DocumentList/DocumentList';
import DocumentFilters from './components/DocumentFilters/DocumentFilters';
import './DocumentsPage.css';
import { DocCategory, DocSortOption } from '../../types/document';

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocCategory | ''>('');
  const [sortOption, setSortOption] = useState(DocSortOption.Newest);

  const visibleDocuments = DOCUMENTS.filter(({ title, category }) => {
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  }).sort((docA, docB) => {
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
    setSelectedCategory(e.target.value as DocCategory);
  };

  const handleSortOption = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as DocSortOption);
  };

  return (
    <div className="documents">
      <header className="documents__header">
        <h1>Documents</h1>
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
    </div>
  );
}
