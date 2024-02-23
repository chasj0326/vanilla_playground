import { notion } from '../api/notionRequests';
import Component from '../core/Component';
import makeRequest from '../core/makeRequest';
import { navigate } from '../routes/Router';
import { CreatedDocument, RootDocuments } from '../types/document';
import { DirectoryData } from '../types/data';
import { router } from '../main';
import { store, directoryData } from '../store';

class Directory extends Component {
  created(): void {
    store.subscribe([directoryData], () => this.render());
  }

  async getRootDocuments(newId?: number) {
    const setDirectoryData =
      store.setData<DirectoryData>(directoryData);
    const { data } = await makeRequest<RootDocuments>(() =>
      notion.all()
    );
    if (newId) {
      setDirectoryData(() => ({
        currentId: newId,
        rootDocuments: data ?? [],
      }));
    } else {
      setDirectoryData((prev) => ({
        ...prev,
        rootDocuments: data ?? [],
      }));
    }
  }

  async createDocument(parent: null | string) {
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

  async deleteDocument(id: number) {
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

  async mounted() {
    const { params } = router.match() || {};
    await this.getRootDocuments(Number(params?.id));

    const setDirectoryData =
      store.setData<DirectoryData>(directoryData);

    this.addEvent('click', async ({ tagName, id, parentElement }) => {
      if (tagName === 'LI') {
        setDirectoryData((prev) => ({
          ...prev,
          currentId: Number(id),
        }));
        navigate(`/${id}`);
      } else if (tagName === 'BUTTON') {
        const documentId = parentElement?.id ?? null;
        switch (id) {
          case 'delete': {
            await this.deleteDocument(Number(documentId));
            break;
          }
          case 'create': {
            await this.createDocument(documentId);
            break;
          }
          case 'create-null': {
            await this.createDocument(null);
            break;
          }
        }
      }
    });
  }

  template() {
    console.log('render!');
    const { currentId, rootDocuments } =
      store.getData<DirectoryData>(directoryData);

    const renderDocument = (
      rootDocuments: RootDocuments,
      depth: number
    ): string => {
      return `
       <ul>${rootDocuments
         .map(({ id, title, documents }) => {
           const defaultTitle = '제목 없음';
           const titleEl =
             id === currentId
               ? `<b>${title || defaultTitle}</b>`
               : title || defaultTitle;

           return `
            <li id='${id}'>${titleEl}<button id='delete'>delete</button><button id='create'>create</button></li>
            ${renderDocument(documents, depth + 1)}
          `;
         })
         .join('')}
        </ul>
      `;
    };

    return `
      <div style='border: 1px solid black; padding: 10px'>${renderDocument(
        rootDocuments,
        0
      )}</div>
      <button id='create-null'>문서 추가하기</button>
    `;
  }
}

export default Directory;
