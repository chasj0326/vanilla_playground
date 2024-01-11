import HomePage from './pages/HomePage';
import CountPage from './pages/CountPage';
import createRouter from './routes/Router';
import './style.css';
import AboutPage from './pages/AboutPage';
import ListPage from './pages/ListPage';

const homePage = new HomePage();
const countPage = new CountPage();
const aboutPage = new AboutPage();
const listPage = new ListPage();

createRouter([
  {
    path: '/',
    component: homePage.render,
    children: [
      {
        path: '/about',
        component: aboutPage.render,
      },
      {
        path: '/list',
        component: listPage.render,
        children: [
          {
            path: '/item1',
            component: (page) => {
              page.innerHTML = `<p>item1 페이지 입니다</p>`;
            },
          },
          {
            path: '/item2',
            component: (page) => {
              page.innerHTML = `<p>item2 페이지 입니다</p>`;
            },
          },
        ],
      },
    ],
  },
]);
