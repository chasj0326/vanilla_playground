import { Component, outlet } from '@/core';
import Directory from '@/components/Directory';

class NotionPage extends Component {
  template() {
    return `
    <div style='display: flex; padding: 20px; gap: 20px;'>
      <nav class='directory'></nav>
      ${outlet('main')}
    </div>
    `;
  }

  rendered() {
    this.addComponent(Directory, {
      state: {
        currentId: 0,
        rootDocuments: [],
      },
      props: null,
    });
  }
}

export default NotionPage;
