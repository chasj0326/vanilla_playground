import HomePage from './pages/HomePage';
import CountPage from './pages/CountPage';
import createRouter from './routes/Router';
import './style.css';

const homePage = new HomePage();
const countPage = new CountPage();

createRouter([
  {
    path: '/',
    component: homePage.render,
    children: [
      {
        path: '/count',
        component: countPage.render,
      },
      {
        path: '/page1',
        component: (page) => (page.innerHTML = `<h1>page1</h1>`),
      },
    ],
  },
]);
