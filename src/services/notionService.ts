import {
  CreatedDocument,
  DirectoryData,
  EditorData,
  RootDocuments,
  DetailDocument,
  StoredDocument,
} from '@notion/types';
import { store, directoryData, editorData } from '@notion/store';
import { makeRequest, navigate, storage } from '@core';
import { notionApi } from '@notion/api';
import { UpdateDocumentRequestBody } from '@notion/types';
import {
  STORAGE_KEY,
  defaultStoredDocument,
} from '@notion/constants';
import { isFreshByTime } from '@notion/utils';

const localStorage = storage(window.localStorage);

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
  const storedDocument = localStorage.getItem<StoredDocument>({
    key: STORAGE_KEY.EDITING,
    default: defaultStoredDocument,
  });
  makeRequest<DetailDocument>(() => notionApi.getDetail(id), {
    onSuccess: ({ id, title, content, updatedAt, createdAt }) => {
      if (
        id === storedDocument.id &&
        storedDocument.updatedAt &&
        !isFreshByTime(
          new Date(updatedAt),
          new Date(storedDocument.updatedAt)
        )
      ) {
        if (confirm('작성중인 글이 있습니다. 불러오시겠습니까?')) {
          setEditorData({ ...storedDocument, id, createdAt });
          localStorage.removeItem(STORAGE_KEY.EDITING);
        }
      } else {
        setEditorData({
          id,
          title,
          content,
          updatedAt,
          createdAt,
        });
      }
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
  localStorage.setItem<StoredDocument>({
    key: STORAGE_KEY.EDITING,
    value: {
      id,
      updatedAt: String(new Date()),
      ...body,
    },
  });
  makeRequest(() => notionApi.update(id, body), {
    onSuccess: () => {
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
