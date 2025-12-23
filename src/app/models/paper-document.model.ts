export interface PaperDocument {
  id?: number;
  title: string;
  originalFileName?: string;
  storagePath?: string;
  uploadDate?: string;
  status?: string;
  mimeType?: string;
  sizeInBytes?: number;
  summary?: string;
}
