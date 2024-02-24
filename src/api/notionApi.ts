import apiClient from './apiClient';

interface CreateDocumentRequestBody {
  title: string;
  parent: number | null;
}

interface UpdateDocumentRequestBody {
  title: string;
  content: string;
}

const notionApi = {
  getAll: async () => await apiClient.get('/documents'),
  getDetail: async (id: string) =>
    await apiClient.get(`/documents/${id}`),
  create: async (body: CreateDocumentRequestBody) =>
    await apiClient.post('/documents', body),
  update: async (id: string, body: UpdateDocumentRequestBody) =>
    await apiClient.put(`/documents/${id}`, body),
  delete: async (id: number) =>
    await apiClient.delete(`/documents/${id}`),
};

export default notionApi;
