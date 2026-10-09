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

export const DOC_TYPES = ['PDF', 'DOCX', 'TXT', 'MD'] as const;

export type DocType = (typeof DOC_TYPES)[number];

export interface Document {
  id: string;
  title: string;
  category: DocCategory;
  type: DocType;
  size: string;
  status: DocStatus;
  updatedAt: string;
}

export interface DocumentUploadFormValues {
  title: string;
  category: DocCategory;
  file: FileList;
}
