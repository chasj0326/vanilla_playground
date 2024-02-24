import { notion } from '@/api';
import { Component, makeRequest, navigate } from '@/core';
import {
  CreatedDocument,
  RootDocuments,
  DirectoryData,
} from '@/types';
import { router } from '@/main';
import { store, directoryData } from '@/store';

class Directory extends Component {
  created(): void {
    store.subscribe([directoryData], () => this.render());
  }

  getRootDocuments(newId?: number) {
    const setDirectoryData =
      store.setData<DirectoryData>(directoryData);
    makeRequest<RootDocuments>(() => notion.all(), {
      onSuccess: (data) => {
        setDirectoryData((prev) => ({
          currentId: newId ?? prev.currentId,
          rootDocuments: data ?? [],
        }));
      },
    });
  }

  createDocument(parent: null | string) {
    makeRequest<CreatedDocument>(
      () => notion.create({ parent, title: '' }),
      {
        onSuccess: (data) => {
          this.getRootDocuments(data.id);
          navigate(`/${data.id}`);
        },
      }
    );
  }

  deleteDocument(id: number) {
    const { currentId } = store.getData<DirectoryData>(directoryData);
    makeRequest(() => notion.delete(id), {
      onSuccess: () => {
        this.getRootDocuments();
        if (id === currentId) {
          navigate('/');
        }
      },
    });
  }

  mounted() {
    const { params } = router.match() || {};
    this.getRootDocuments(Number(params?.id));

    const setDirectoryData =
      store.setData<DirectoryData>(directoryData);

    this.addEvent('click', ({ tagName, id }) => {
      if (tagName !== 'LI') return;
      setDirectoryData((prev) => ({
        ...prev,
        currentId: Number(id),
      }));
    });

    this.addEvent('click', ({ tagName, id, parentElement }) => {
      if (tagName !== 'BUTTON') return;

      const documentId = parentElement?.id ?? null;
      switch (id) {
        case 'delete': {
          this.deleteDocument(Number(documentId));
          break;
        }
        case 'create': {
          this.createDocument(documentId);
          break;
        }
        case 'create-null': {
          this.createDocument(null);
          break;
        }
      }
    });
  }

  template() {
    const { currentId, rootDocuments } =
      store.getData<DirectoryData>(directoryData);

    const renderDocument = (
      rootDocuments: RootDocuments,
      depth: number
    ): string => `
       <ul>${rootDocuments
         .map(({ id, title, documents }) => {
           const defaultTitle = '제목 없음';
           const titleEl =
             id === currentId
               ? `<b>${title || defaultTitle}</b>`
               : title || defaultTitle;

           return `
            <li id='${id}'>
              ${titleEl}
              <button id='delete'>delete</button>
              <button id='create'>create</button>
            </li>
            ${renderDocument(documents, depth + 1)}
          `;
         })
         .join('')}
        </ul>
      `;

    return `
      <div style='border: 1px solid black; padding: 10px'>
      ${renderDocument(rootDocuments, 0)}
      </div>
      <button id='create-null'>문서 추가하기</button>
    `;
  }
}

export default Directory;
