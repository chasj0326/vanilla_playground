import apiClient from './apiClient';
import {
  CreateDocumentRequestBody,
  UpdateDocumentRequestBody,
} from '@notion/types';

const notionApi = {
  getAll: async () => await apiClient.get('/documents'),
  getDetail: async (id: number) =>
    await apiClient.get(`/documents/${id}`),
  create: async (body: CreateDocumentRequestBody) =>
    await apiClient.post('/documents', body),
  update: async (id: number, body: UpdateDocumentRequestBody) =>
    await apiClient.put(`/documents/${id}`, body),
  delete: async (id: number) =>
    await apiClient.delete(`/documents/${id}`),
};

export default notionApi;
