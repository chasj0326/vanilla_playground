import { Component, navigate } from '@core';
import { RootDocuments, DirectoryData } from '@notion/types';
import { router } from '@notion/main';
import { store, directoryData } from '@notion/store';
import { notionService as notion } from '@notion/services';
import { PLACEHOLDER } from '@notion/constants';

class Directory extends Component {
  created(): void {
    store.subscribe([directoryData], () => this.render());
  }

  mounted() {
    const { params } = router.match() || {};
    notion.getRootDocuments(Number(params?.id));

    const setDirectoryData = store.setData<DirectoryData>(directoryData);

    this.addEvent('click', ({ tagName, id }) => {
      if (tagName !== 'LI') return;
      setDirectoryData((prev) => ({ ...prev, currentId: Number(id) }));
      navigate(`/${id}`);
    });

    this.addEvent('click', ({ tagName, id, parentElement }) => {
      if (tagName !== 'BUTTON') return;

      const documentId = parentElement?.id;

      switch (id) {
        case 'delete': {
          if (!documentId) return;
          notion.deleteDocument(Number(documentId));
          break;
        }
        case 'create': {
          notion.createDocument(documentId ? Number(documentId) : null);
          break;
        }
        case 'create-null': {
          notion.createDocument(null);
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
           const titleEl =
             id === currentId
               ? `<b>${title || PLACEHOLDER.DIRECTORY_TITLE}</b>`
               : title || PLACEHOLDER.DIRECTORY_TITLE;

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
