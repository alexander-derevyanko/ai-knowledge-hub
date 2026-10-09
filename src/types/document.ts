export const enum DocCategory {
  Architecture = 'architecture',
  Development = 'development',
  AI = 'ai',
  Product = 'product',
  Business = 'business',
  Security = 'security',
}

export const enum DocStatus {
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
