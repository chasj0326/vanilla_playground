import Component from '../core/Component';
import { outlet } from '../routes/domUtils';

class NotionPage extends Component {
  template(): string {
    return `
      <nav>directory</nav>
      ${outlet('main')}
    `;
  }
}

export default NotionPage;
