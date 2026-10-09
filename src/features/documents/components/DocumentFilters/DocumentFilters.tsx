import { DocCategory, DocSortOption } from '../../../../types/document';
import './DocumentFilters.css';

interface DocumentFiltersProps {
  searchQuery: string;
  selectedCategory: DocCategory | '';
  sortOption: DocSortOption;
  handleSearchQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectedCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortOption: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function DocumentFilters(props: DocumentFiltersProps) {
  return (
    <section className="filter-block">
      <div className="filter-block__search">
        <label htmlFor="search">Search</label>

        <div className="filter-block__search-field">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="filter-block__search-icon">
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>

          <input
            id="search"
            type="search"
            value={props.searchQuery}
            onChange={props.handleSearchQuery}
            placeholder="Search documents..."
          />
        </div>
      </div>

      <div className="filter-block__field">
        <label htmlFor="category">Category</label>

        <select
          id="category"
          name="category"
          value={props.selectedCategory}
          onChange={props.handleSelectedCategory}
        >
          <option value="">All</option>
          <option value={DocCategory.Architecture}>Architecture</option>
          <option value={DocCategory.Development}>Development</option>
          <option value={DocCategory.AI}>AI</option>
          <option value={DocCategory.Product}>Product</option>
          <option value={DocCategory.Business}>Business</option>
          <option value={DocCategory.Security}>Security</option>
        </select>
      </div>

      <div className="filter-block__field">
        <label htmlFor="sort-by">Sort by</label>

        <select
          id="sort-by"
          name="sortBy"
          value={props.sortOption}
          onChange={props.handleSortOption}
        >
          <option value={DocSortOption.Newest}>Newest</option>
          <option value={DocSortOption.Oldest}>Oldest</option>
          <option value={DocSortOption.TitleAsc}>Title A-Z</option>
          <option value={DocSortOption.TitleDesc}>Title Z-A</option>
        </select>
      </div>
    </section>
  );
}
