import { Component } from "@notion/core";
import { GuestContent } from "@notion/types";

interface WriteFormProps {
  forNew: Boolean;
  initial?: GuestContent;
  onSubmit: (guestContent: GuestContent) => void;
  onCancel?: VoidFunction;
}

class WriteForm extends Component<WriteFormProps> {
  getInput(name: string) {
    return this.findElement<HTMLTextAreaElement | HTMLInputElement>(
      `[name='${name}']`,
    ).value;
  }

  makeForm(): GuestContent {
    const forNew = this.props?.forNew;

    const baseContent = {
      username: this.getInput("username"),
      content: this.getInput("content"),
      profile: {
        background: "",
        charactor: "",
      },
    };

    if (forNew) {
      return {
        ...baseContent,
        updateAt: "",
        password: this.getInput("password"),
      };
    }
    return {
      ...baseContent,
      updateAt: this.props?.initial?.updateAt ?? "",
      password: this.props?.initial?.password ?? "",
    };
  }

  mounted(): void {
    this.addEvent("click", (target) => {
      const action = target.closest("button")?.dataset.action;
      const onSubmit = this.props?.onSubmit;
      const onCancel = this.props?.onCancel;

      if (!onSubmit) return;

      switch (action) {
        case "submit": {
          onSubmit(this.makeForm());
          break;
        }
        case "cancel": {
          if (onCancel) onCancel();
          break;
        }
      }
    });
  }

  template(): string {
    const {
      username = "",
      content = "",
      password = "",
    } = this.props?.initial ?? {};
    const forNew = this.props?.forNew;

    return `
      <div class='item-header'>
        <div class='info-block'>
          <div class='profile'></div>
          <input name="username" value="${username}" placeholder="닉네임"/>
        </div>
        ${
          forNew
            ? `<input name="password" value="${password}" placeholder="비밀번호"/>`
            : `<button type="button" data-action="cancel">취소</button>`
        }
      </div>
      <div class="item-footer">
        <textarea name="content" placeholder="내용">${content}</textarea>
        <button type="button" data-action="submit" class="submit-btn">완료</button>
      </div>
    `;
  }
}

export default WriteForm;
