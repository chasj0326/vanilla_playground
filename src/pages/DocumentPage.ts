import { Component } from '@core';
import Editor from '@notion/components/Editor';

class DocumentPage extends Component {
  template() {
    return `
     <div class='editor'></div>
    `;
  }

  mounted(): void {
    this.addComponent(Editor);
  }
}

export default DocumentPage;
