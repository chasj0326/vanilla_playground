import { Component } from '@/core';
import { router } from '@/main';

class DocumentPage extends Component {
  template() {
    const matched = router.match();
    return `
      DOCUMENT: ${matched?.params.id}
    `;
  }
}

export default DocumentPage;
