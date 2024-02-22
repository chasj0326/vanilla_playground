import Component from '../core/Component';
import { outlet } from '../routes/domUtils';
import Directory from '../components/Directory';
import { getRootDocuments } from '../api/notionRequests';
import { RootDocuments } from '../types/document';
import makeRequest from '../core/makeRequest';

class NotionPage extends Component {
  template() {
    return `
    <div style='display: flex; padding: 20px; gap: 20px;'>
      <nav class='directory'></nav>
      ${outlet('main')}
    </div>
    `;
  }

  async rendered(): Promise<void> {
    const { data } = await makeRequest<RootDocuments>(
      () => getRootDocuments(),
      {
        onStart: () => {
          console.log('fetch start!');
        },
        onEnd: () => {
          console.log('fetch end!');
        },
        onSuccess: (data) => {
          console.log('success');
        },
        onError: (error) => {
          console.log(error.message);
        },
      }
    );
    console.log(data);
    this.addComponent(Directory);
  }
}

export default NotionPage;
