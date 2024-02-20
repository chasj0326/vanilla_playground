import Component from '../core/Component';
import { rootDocuments } from '../mocks/data';
import { navigate } from '../routes/Router';
import { RootDocuments } from '../types/document';

class Directory extends Component<null, number> {
  template(): string {
    console.log('directory rendering');
    const documentId = this.state;

    const renderDocument = (
      rootDocuments: RootDocuments,
      depth: number
    ): string => {
      return `
       <ul>${rootDocuments
         .map(({ id, title, documents }) => {
           const titleEl =
             ' '.repeat(depth) +
             (id === documentId ? `<b>${title}</b>` : title);
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

  setEvent(): void {
    this.$target.addEventListener('click', (ev) => {
      const targetElement = ev.target as HTMLElement;

      if (targetElement.tagName === 'LI' && targetElement.id) {
        this.setState(Number(targetElement.id));
        navigate(`/${Number(targetElement.id)}`);
      }
    });
  }
}

export default Directory;
