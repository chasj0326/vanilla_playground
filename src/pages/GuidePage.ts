import { Component } from "@core";

class GuidePage extends Component {
  template(): string {
    return `
      <div class="guide-container" id="rich-editor">
        <div id="rich-editor">
          <h2 id="block" placeholder="제목2">Notion with <u>TypeScript</u></h2>
          <q id="block" placeholder="인용"
            ><b>노션의 간단한 기능들을 구현한 클론 프로젝트</b>입니다 ✨<br />사용
            가능한 기능은 아래와 같습니다.<br /><i></i></q
          ><mark id="block"
            ><i>이 페이지는 구현한 에디터로 작성되었습니다!</i></mark
          >
          <div id="block"></div>
          <h3 id="block" placeholder="제목3">기본 기능</h3>
          <h4 id="block" placeholder="제목4">✏️ 문서 추가 및 삭제</h4>
          <aside id="block">
            좌측 영역에서 문서를 <u>추가</u> / <u>삭제</u> 할 수 있어요<br />문서
            추가 시, 선택된 문서의 하위 문서로 추가됩니다.
          </aside>
          <div id="block"></div>
          <div id="block"></div>
          <h3 id="block" placeholder="제목3">에디터 기능</h3>
          <h4 id="block" placeholder="제목4">✅ 명령 사용하기</h4>
          <aside id="block">
            블럭에 '/' 로 시작하는 명령을 입력하여 원하는 서식으로 변환할 수
            있어요<br /><i>예시는 아래를 참고해 주세요!</i>
          </aside>
          <div id="block"><b>제목</b> : /h1 ~ /h4</div>
          <div id="block"><b>인용</b> : /q</div>
          <div id="block"><b>블럭</b> : /block</div>
          <div id="block"><b>배경</b> : /mark</div>
          <div id="block"></div>
          <h4 id="block" placeholder="제목4">✅ 단축키 사용하기</h4>
          <aside id="block">
            내용을 선택한 후, 단축키를 눌러 원하는 텍스트 스타일을 부여할 수 있어요
          </aside>
          <div id="block"><u>밑줄</u> : ctrl + u</div>
          <div id="block"><b>굵게</b> : ctrl + b</div>
          <div id="block"><i>기울임</i> : ctrl + i</div>
          <div id="block"></div>
          <div id="block"></div>
          <h1 id="block" placeholder="제목1">제목1 입니다</h1>
          <h2 id="block" placeholder="제목2">제목2 입니다</h2>
          <h3 id="block" placeholder="제목3">제목3 입니다</h3>
          <h4 id="block" placeholder="제목4">제목4 입니다</h4>
          <q id="block" placeholder="인용">인용입니다</q>
          <aside id="block">블럭입니다</aside>
          <mark id="block">배경이 있는 글 입니다</mark>
        </div>
      </div>
    `;
  }
}

export default GuidePage;
