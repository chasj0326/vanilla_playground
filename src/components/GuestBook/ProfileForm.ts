import { backgrounds, charactors, makeImageSrc, randomProfile } from "./utils";
import { Component } from "@notion/core";

interface ProfileFormProps {
  onSelect: (profile: { charactor: string; background: string }) => void;
  onBlur: VoidFunction;
}

interface ProfileFormState {
  background: string;
  charactor: string;
}

class ProfileForm extends Component<ProfileFormProps, ProfileFormState> {
  mounted(): void {
    this.addEvent("click", ({ className, id }) => {
      const value = id;
      if (!(this.state && this.props)) return;

      const { charactor, background } = this.state;
      const { onSelect, onBlur } = this.props;

      switch (className) {
        case "color": {
          this.setState({ charactor, background: value });
          break;
        }
        case "charactor": {
          if (onSelect) onSelect({ background, charactor: value });
          break;
        }
        case "random": {
          if (onSelect) onSelect(randomProfile());
          break;
        }
        case "close": {
          if (onBlur) onBlur();
          break;
        }
      }
    });
  }

  template(): string {
    const { background = backgrounds[0] } = this.state ?? {};

    const backgroundEl = (color: string) =>
      `<div class="color" id="${color}" style="background: #${color}"></div>`;
    const charactorEl = (charactor: string) =>
      `<img class="charactor" id="${charactor}" src="${makeImageSrc(charactor, background)}">`;

    return `
      <div class="profile-picker">
        <header>
          <div>프로필 선택</div>
          <div>
            <button class="random">랜덤</button>
            <button class="close">닫기</button>
          </div>
        </header>
        <div class="color-picker">
        ${backgrounds.map(backgroundEl).join("")}
        </div>
        <div class="charactor-picker">
        ${charactors.map(charactorEl).join("")}
        </div>
      </div>
      `;
  }
}

export default ProfileForm;
