import { Component } from '@core';
import { router } from '@notion/main';

class DocumentPage extends Component {
  template() {
    const matched = router.match();
    return `
      DOCUMENT: ${matched?.params.id}
    `;
  }
}

export default DocumentPage;
