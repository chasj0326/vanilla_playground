import App from './App';
import './style.css';

const $app = document.querySelector<HTMLElement>('#app');
new App({ $app: $app! });
