import NavBar from '../components/NavBar';
import Component from '../core/Component';
import { outlet } from '../routes/domUtils';

class PostPage extends Component {
  template(): string {
    return `
      <ul></ul>
      ${outlet('p')}
    `;
  }
  mounted(): void {
    new NavBar({
      target: this.$target.querySelector('ul')!,
      props: {
        tag: 'li',
        contents: Array.from({ length: 5 }, (_, i) => ({
          path: `/post/${i + 1}`,
          name: `title ${i + 1}`,
        })),
      },
    });
  }
}

export default PostPage;
