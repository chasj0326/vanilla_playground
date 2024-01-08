import App from './App';
import CountPage from './components/Counter';
import createRouter from './routes/Router';
import './style.css';

createRouter([
  {
    path: '/',
    component: () => {
      console.log('/app');
    },
    children: [
      {
        path: '/count',
        component: () => {
          console.log('/count');
        },
        children: [
          {
            path: '/child',
            component: () => console.log('/count/child'),
          },
        ],
      },
      {
        path: '/count/hello',
        component: () => {
          console.log('/count/hello');
        },
      },
      {
        path: '/post/:id',
        component: () => {
          console.log('/post/:id');
        },
      },
    ],
  },
  {
    path: '/test',
    component: () => {
      console.log('/test');
    },
  },
]);
