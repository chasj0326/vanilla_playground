import Page from '../core/Page';

class AboutPage extends Page {
  render($page: HTMLElement): void {
    $page.innerHTML = `
        <h3>About 페이지 입니다.</h3>
    `;
  }
}

export default AboutPage;
