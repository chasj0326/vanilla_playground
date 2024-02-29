import { Component, navigate } from '@core';
import { notionService as notion } from '@notion/services';
import { directoryData, store } from '@notion/store';
import { DirectoryData } from '@notion/types';
import { changeDocumentTitle } from '@notion/utils';

class NavHeader extends Component {
  mounted(): void {
    const setDirectoryData = store.setData<DirectoryData>(directoryData);

    this.addEvent('click', (target) => {
      const action = target.closest('button')?.dataset.action;
      if (!action) return;

      switch (action) {
        case 'go-home': {
          navigate('/');
          changeDocumentTitle();
          setDirectoryData((prev) => ({ ...prev, currentId: 0 }));
          break;
        }
        case 'create-root': {
          notion.createDocument(null);
          break;
        }
      }
    });
  }

  template(): string {
    return `
      <button data-action='go-home' class='btn-home'>
        차차의 Notion
      </button>
      <button data-action='create-root'>
        <i class="fa-solid fa-circle-plus"></i>
        <div>새 페이지</div>
      </button>
    `;
  }
}

export default NavHeader;
