import NavBar from '../components/NavBar';
import Component from '../core/Component';
import { outlet } from '../routes/domUtils';
import { postItems, store } from '../store';

class Button extends Component {
  template(): string {
    return `
      <button id="add">add post</button>
      <button id="reset">reset post</button>
    `;
  }

  setEvent() {
    const { setPosts, resetPosts } = this.props;

    this.$target.addEventListener('click', (e) => {
      switch ((e.target as HTMLElement).id) {
        case 'add':
          setPosts((prev: number[]) => [...prev, prev.length + 1]);
          break;
        case 'reset':
          resetPosts();
      }
    });
  }
}

class PostPage extends Component {
  template(): string {
    console.log('render post again');
    return `
      <ul></ul>
      <div class="button"></div>
      <hr/>
      ${outlet('p')}
    `;
  }

  created() {
    store.subscribe([postItems], () => this.render());
  }

  mounted() {
    const [posts, setPosts] = store.useData<number[]>(postItems);
    const resetPosts = store.resetData(postItems);

    this.addComponent(NavBar, {
      selector: 'ul',
      props: {
        tag: 'li',
        contents: posts.map((postId) => ({
          path: `/post/${postId}`,
          name: `post #${postId}`,
        })),
      },
    });

    this.addComponent(Button, {
      props: {
        setPosts,
        resetPosts,
      },
    });
  }
}

export default PostPage;
