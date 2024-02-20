import './style.css';
import App from './App';

const $app = document.querySelector<HTMLElement>('#app');
if ($app) {
  new App({ target: $app });
}
