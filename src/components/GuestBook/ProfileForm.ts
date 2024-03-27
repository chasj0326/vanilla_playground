import { Component } from "@notion/core";

const charactors = [
  "Trigger",
  "Oreo",
  "Trouble",
  "Sasha",
  "Whiskers",
  "Milo",
  "Missy",
  "Abby",
  "Toby",
  "Snikers",
  "Jack",
  "Spooky",
  "Samantha",
  "Cali",
  "Harley",
  "Coco",
  "Lucy",
  "Felix",
  "Sam",
  "Pumpkin",
];

const backgrounds = [
  "b6e3f4",
  "c0aede",
  "d1d4f9",
  "ffd5dc",
  "ffdfbf",
  "ffffff",
];

const makeImageSrc = (charactor: string, background: string) => {
  return `https://api.dicebear.com/8.x/notionists-neutral/svg?seed=${charactor}&backgroundColor=${background}`;
};

interface ProfileFormState {
  background: string;
  charactor: string;
}

class ProfileForm extends Component<{}, ProfileFormState> {
  mounted(): void {
    this.addEvent("click", (target) => {
      if (target.className === "color") {
        const background = target.id;
        const charactor = this.state?.charactor ?? "";
        this.setState({ charactor, background });
      }
    });
  }

  template(): string {
    const currentBackground = this.state?.background ?? backgrounds[0];
    return `
      <div class="profile-picker">
        <div class="color-picker">
        ${backgrounds.map((color) => `<div class="color" id="${color}" style="background: #${color}"></div>`).join("")}
        </div>
        <div class="charactor-picker">
        ${charactors.map((charactor) => `<img src="${makeImageSrc(charactor, currentBackground)}">`).join("")}
        </div>
      </div>
      `;
  }
}

export default ProfileForm;
