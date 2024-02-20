import Component from '../core/Component';
import { router } from '../main';

class DocumentPage extends Component {
  template(): string {
    const matched = router.match();
    return `
      DOCUMENT: ${matched?.params.id}
    `;
  }
}

export default DocumentPage;
