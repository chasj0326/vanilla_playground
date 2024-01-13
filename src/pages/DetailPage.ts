import Component from '../core/Component';
import { router } from '../main';

class DetailPage extends Component {
  template(): string {
    const { match } = router.match(window.location.pathname);
    return `<p>post ${match?.params.id} 의 내용입니다.</p>`;
  }
}

export default DetailPage;
