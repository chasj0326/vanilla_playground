import EditInfo from '../components/EditInfo';
import UserInfo from '../components/UserInfo';
import Component from '../core/Component';

class AboutPage extends Component {
  template(): string {
    return `
      <div>
        <h3>About 페이지 입니다.</h3>
        <div class='userinfo'></div>
        <div class='editinfo'></div>
      </div>`;
  }

  mounted(): void {
    this.addComponent(UserInfo);
    this.addComponent(EditInfo);
  }
}

export default AboutPage;
