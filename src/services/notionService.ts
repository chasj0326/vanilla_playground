import {
  CreatedDocument,
  DirectoryData,
  EditorData,
  RootDocuments,
  DocumentContent,
} from '@notion/types';
import { store, directoryData, editorData } from '@notion/store';
import { makeRequest, navigate } from '@core';
import { notionApi } from '@notion/api';
import { UpdateDocumentRequestBody } from '@notion/types';

const getRootDocuments = (newId?: number) => {
  const setDirectoryData =
    store.setData<DirectoryData>(directoryData);
  makeRequest<RootDocuments>(() => notionApi.getAll(), {
    onSuccess: (data) => {
      setDirectoryData((prev) => ({
        currentId: newId ?? prev.currentId,
        rootDocuments: data ?? [],
      }));
    },
  });
};

const getDetailDocument = (id: number) => {
  const setEditorData = store.setData<EditorData>(editorData);
  makeRequest<DocumentContent>(() => notionApi.getDetail(id), {
    onSuccess: ({ id, title, content, updatedAt, createdAt }) => {
      setEditorData({
        id,
        title,
        content,
        updatedAt,
        createdAt,
      });
    },
  });
};

const createDocument = (parent: null | number) => {
  makeRequest<CreatedDocument>(
    () => notionApi.create({ parent, title: '' }),
    {
      onSuccess: (data) => {
        getRootDocuments(data.id);
        navigate(`/${data.id}`);
      },
    }
  );
};

const updateDocument = (
  id: number,
  target: 'title' | 'content',
  body: UpdateDocumentRequestBody
) => {
  makeRequest(() => notionApi.update(id, body), {
    onSuccess: () => {
      getDetailDocument(id);
      if (target === 'title') getRootDocuments();
    },
  });
};

const deleteDocument = (id: number) => {
  const { currentId } = store.getData<DirectoryData>(directoryData);
  makeRequest(() => notionApi.delete(id), {
    onSuccess: () => {
      getRootDocuments();
      if (id === currentId) {
        getRootDocuments();
        if (id === currentId) navigate('/');
      }
    },
  });
};

const notionService = {
  getRootDocuments,
  getDetailDocument,
  createDocument,
  updateDocument,
  deleteDocument,
};

export default notionService;
