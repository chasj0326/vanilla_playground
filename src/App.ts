import Component from './core/Component';
import { outlet } from './routes/domUtils';

class App extends Component {
  template(): string {
    return `${outlet()}`;
  }
}

export default App;
