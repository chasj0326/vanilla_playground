import Component from '../../core/Component';

interface OutletProps {
  parent: typeof Component;
  target: HTMLElement;
}

class Outlet {
  $parent;
  $target;

  constructor({ parent, target }: OutletProps) {
    this.$parent = parent;
    this.$target = target;

    console.log(parent.name);
    console.log(window.location.pathname);
  }

  // url 이랑 비교!
  // 렌더링 되어야 하는 page component 찾기

  // /post/3 이고 parent 가 없다 + outlet 이 렌더링된게 없다
  // => 루트 페이지 컴포넌트 (HomePage)

  // /post/3 이고 parent 가 HomePage 이다 ?
  // / 지우기 /post 걸림
  // => PostPage 컴포넌트

  // /post/3 이고 parent 가 PostPage 이다 ?
  // / 지우기 /post 지우기 /:id 걸림
  // => DetailPage 컴포넌트

  // target 안에 렌더링해주기
}

export default Outlet;
