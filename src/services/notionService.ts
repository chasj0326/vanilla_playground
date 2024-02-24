import {
  CreatedDocument,
  DirectoryData,
  RootDocuments,
} from '@notion/types';
import { store, directoryData } from '@notion/store';
import { makeRequest, navigate } from '@core';
import { notionApi } from '@notion/api';

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
  createDocument,
  deleteDocument,
};

export default notionService;
