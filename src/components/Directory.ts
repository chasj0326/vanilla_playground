import Component from '../core/Component';
import { rootDocuments } from '../mocks/data';
import { navigate } from '../routes/Router';
import { RootDocuments } from '../types/document';

class Directory extends Component<null, string> {
  template() {
    const documentId = this.state;

    const renderDocument = (
      rootDocuments: RootDocuments,
      depth: number
    ): string => {
      return `
       <ul>${rootDocuments
         .map(({ id, title, documents }) => {
           const titleEl =
             id === documentId ? `<b>${title}</b>` : title;

           return `
            <li id='${id}'>${titleEl}</li>
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
    `;
  }

  mounted() {
    this.addEvent('click', ({ tagName, id }) => {
      if (tagName === 'LI' && id) {
        this.setState(id);
        navigate(`/${id}`);
      }
    });
  }
}

export default Directory;
