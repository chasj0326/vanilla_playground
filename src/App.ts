import viteLogo from '../public/vite.svg';
import typescriptLogo from '../public/typescript.svg';
import Counter from './components/Counter';
import createRouter from './routes/Router';
import { routes } from './routes/routes';

class App {
  $app;

  constructor({ $app }: { $app: HTMLElement }) {
    this.$app = $app;
    this.render();
  }

  render() {
    this.$app.innerHTML = `
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="${viteLogo}" class="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
        </a>
        <h1>Vite + TypeScript</h1>
        <div class="card">
          <!-- Counter Component -->
        </div>
        <p class="read-the-docs">
          Click on the Vite and TypeScript logos to learn more
        </p>
      </div>
    `;

    const card = this.$app.querySelector<HTMLElement>('.card');
    new Counter({
      parent: card!,
      element: {
        tag: 'button',
        attributes: { id: 'counter', type: 'button' },
      },
      initialState: 0,
    });

    createRouter([
      {
        path: '',
        name: '홈',
        component: () => console.log('홈페이지입니다'),
        children: [
          {
            path: 'login',
            name: '로그인',
            component: () => console.log('로그인페이지입니다'),
          },
          {
            path: 'list',
            name: '목록',
            component: () => console.log('목록페이지입니다'),
            children: [
              {
                path: 'item1',
                name: '아이템1',
                component: () => console.log('아이템1 페이지입니다'),
              },
              {
                path: 'item2',
                name: '아이템2',
                component: () => console.log('아이템2 페이지입니다'),
              },
              {
                path: 'item3',
                name: '아이템3',
                component: () => console.log('아이템3 페이지입니다'),
              },
            ],
          },
          {
            path: 'post/:id',
            name: '포스트',
            component: () => console.log('포스트 페이지입니다'),
          },
        ],
      },
    ]);
  }
}

export default App;
