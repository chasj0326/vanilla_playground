import Component from '../core/Component';
import { outlet } from '../routes/domUtils';
import Directory from '../components/Directory';

class NotionPage extends Component {
  template() {
    return `
    <div style='display: flex; padding: 20px; gap: 20px;'>
      <nav class='directory'></nav>
      ${outlet('main')}
    </div>
    `;
  }

  rendered(): void {
    this.addComponent(Directory);
  }
}

export default NotionPage;
