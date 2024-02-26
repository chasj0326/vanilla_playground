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

    this.addEvent('click', (target) => {
      const $li = target.closest('li');
      const documentId = $li?.id;
      const { action } = target.dataset;

      if (!documentId) return;

      switch (action) {
        case 'toggle': {
          notion.toggleDocument(Number(documentId));
          break;
        }
        case 'create': {
          notion.createDocument(documentId ? Number(documentId) : null);
          break;
        }
        case 'create-root': {
          notion.createDocument(null);
          break;
        }
        case 'delete': {
          notion.deleteDocument(Number(documentId));
          break;
        }
        default: {
          setDirectoryData((prev) => ({
            ...prev,
            currentId: Number(documentId),
          }));
          navigate(`/${documentId}`);
        }
      }
    });
  }

  template() {
    const { currentId, rootDocuments, toggleData } =
      store.getData<DirectoryData>(directoryData);

    const renderDocument = (
      rootDocuments: RootDocuments,
      depth: number
    ): string => {
      if (rootDocuments.length === 0)
        return `<div class='document-holder' style='--depth: ${depth}'>하위 페이지 없음</div>`;
      return `
        <ul>${rootDocuments
          .map(({ id, title, documents }) => {
            return `
            <li id='${id}' class='${id === currentId ? 'current' : ''}'>
              <div class='title-container' style='--depth: ${depth}'>
                <button data-action='toggle'>></button>
                <div class='title'>
                ${title || PLACEHOLDER.DIRECTORY_TITLE}</div>
              </div>
              <div class='button-container'>
                <button data-action='delete'>-</button>
                <button data-action='create'>+</button>
              </div>
            </li>
            ${toggleData[id] ? renderDocument(documents, depth + 1) : ''}
          `;
          })
          .join('')}
        </ul>
     `;
    };

    return `
      <header>
        <button data-action='create-root'>문서 추가하기</button>
      </header>
      ${renderDocument(rootDocuments, 0)}
    `;
  }
}

export default Directory;
