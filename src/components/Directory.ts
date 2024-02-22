import { notion } from '../api/notionRequests';
import Component from '../core/Component';
import makeRequest from '../core/makeRequest';
import { navigate } from '../routes/Router';
import { CreatedDocument, RootDocuments } from '../types/document';

interface DirectoryState {
  currentId: number;
  rootDocuments: RootDocuments | undefined;
}

class Directory extends Component<null, DirectoryState> {
  async getRootDocuments(newId?: number) {
    const { data } = await makeRequest<RootDocuments>(() =>
      notion.all()
    );
    if (newId) {
      this.setState({ currentId: newId, rootDocuments: data });
    } else {
      this.setState({ ...this.state, rootDocuments: data });
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
    makeRequest(() => notion.delete(id), {
      onSuccess: () => {
        this.getRootDocuments();
        if (id === this.state.currentId) {
          navigate('/');
        }
      },
    });
  }

  async mounted() {
    await this.getRootDocuments();

    this.addEvent('click', async ({ tagName, id, parentElement }) => {
      switch (tagName) {
        case 'LI': {
          this.setState({ ...this.state, currentId: Number(id) });
          navigate(`/${id}`);
          break;
        }
        case 'BUTTON': {
          const { id: documentId } = parentElement ?? {};
          switch (id) {
            case 'delete': {
              await this.deleteDocument(Number(documentId));
              break;
            }
            case 'create': {
              await this.createDocument(documentId ?? null);
              break;
            }
            case 'create-null': {
              await this.createDocument(null);
              break;
            }
          }
        }
      }
    });
  }

  template() {
    const { currentId } = this.state ?? {};
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
        this.state.rootDocuments ?? [],
        0
      )}</div>
      <button id='create-null'>문서 추가하기</button>
    `;
  }
}

export default Directory;
