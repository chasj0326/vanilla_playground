import { notionApi } from './notionApi';

interface CreateDocumentRequestBody {
  title: string;
  parent: string | null;
}

interface UpdateDocumentRequestBody {
  title: string;
  content: string;
}

export const getRootDocuments = async () => {
  return await notionApi.get('/documents');
};

export const getDocument = async (id: string) => {
  return await notionApi.get(`/documents/${id}`);
};

export const createDocument = async (
  body: CreateDocumentRequestBody
) => {
  return await notionApi.post('/documents', body);
};

export const updateDocument = async (
  id: string,
  body: UpdateDocumentRequestBody
) => {
  return await notionApi.put(`/documents/${id}`, body);
};

export const deleteDocument = async (id: number) => {
  return await notionApi.delete(`/documents/${id}`);
};
