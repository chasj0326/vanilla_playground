import { notionApi } from './notionApi';

interface CreateDocumentRequestBody {
  title: string;
  parent: string | null;
}

interface UpdateDocumentRequestBody {
  title: string;
  content: string;
}

const notion = {
  all: async () => await notionApi.get('/documents'),
  detail: async (id: string) =>
    await notionApi.get(`/documents/${id}`),
  create: async (body: CreateDocumentRequestBody) =>
    await notionApi.post('/documents', body),
  update: async (id: string, body: UpdateDocumentRequestBody) =>
    await notionApi.put(`/documents/${id}`, body),
  delete: async (id: number) =>
    await notionApi.delete(`/documents/${id}`),
};

export default notion;
