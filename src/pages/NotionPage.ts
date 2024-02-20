import Component from '../core/Component';
import { outlet } from '../routes/domUtils';
import Directory from '../components/Directory';

class NotionPage extends Component {
  template(): string {
    console.log('notion page rendering');
    return `
    <div style='display: flex; padding: 20px; gap: 20px;'>
      <nav class='directory'></nav>
      ${outlet('main')}
    </div>
    `;
  }

  mounted(): void {
    this.addComponent(Directory);
  }
}

export default NotionPage;
