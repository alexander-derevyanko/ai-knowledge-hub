import { DOC_TYPES, type DocType } from '../types/document';

const isDocType = (value: string): value is DocType => DOC_TYPES.some((type) => type === value);

export const getDocType = (fileName: string): DocType | null => {
  const extension = fileName.split('.').pop()?.toUpperCase();

  return extension && isDocType(extension) ? extension : null;
};
