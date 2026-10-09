export enum DocCategory {
  Architecture = 'architecture',
  Development = 'development',
  AI = 'ai',
  Product = 'product',
  Business = 'business',
  Security = 'security',
}

export enum DocSortOption {
  Newest = 'newest',
  Oldest = 'oldest',
  TitleAsc = 'title-asc',
  TitleDesc = 'title-desc',
}

export enum DocStatus {
  Ready = 'ready',
  Processing = 'processing',
  Failed = 'failed',
}

export type DocType = 'PDF' | 'DOCX' | 'TXT' | 'MD';

export interface Document {
  id: string;
  title: string;
  category: DocCategory;
  type: DocType;
  size: string;
  status: DocStatus;
  updatedAt: string;
}
