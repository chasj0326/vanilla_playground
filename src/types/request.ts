export interface CreateDocumentRequestBody {
  title: string;
  parent: number | null;
}

export interface UpdateDocumentRequestBody {
  title: string;
  content: string;
}
