import { notionApiClient } from './apiClient';
import {
  CreateDocumentRequestBody,
  UpdateDocumentRequestBody,
} from '@notion/types';

const notionApi = {
  getAll: async () => await notionApiClient.get('/documents'),
  getDetail: async (id: number) =>
    await notionApiClient.get(`/documents/${id}`),
  create: async (body: CreateDocumentRequestBody) =>
    await notionApiClient.post('/documents', body),
  update: async (id: number, body: UpdateDocumentRequestBody) =>
    await notionApiClient.put(`/documents/${id}`, body),
  delete: async (id: number) =>
    await notionApiClient.delete(`/documents/${id}`),
};

export default notionApi;
