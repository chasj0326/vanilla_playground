import { Component } from '@core';
import Editor from '@notion/components/Editor';
import { router } from '@notion/main';

class DocumentPage extends Component {
  template() {
    return `
     <div class='editor'></div>
    `;
  }

  mounted(): void {
    const { params } = router.match() || {};
    const documentId = Number(params?.id);

    this.addComponent(Editor, {
      props: {
        documentId,
      },
    });
  }
}

export default DocumentPage;
