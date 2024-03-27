import { Component } from "@notion/core";
import { GuestContent } from "@notion/types";
import { PLACEHOLDER } from "@notion/constants";

interface WriteFormProps {
  forNew: Boolean;
  initial?: GuestContent;
  onSubmit: (guestContent: GuestContent) => void;
  onCancel?: VoidFunction;
  onDelete?: VoidFunction;
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
      const { onSubmit, onCancel, onDelete } = this.props ?? {};

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
        case "delete": {
          if (onDelete) onDelete();
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
          <input name="username" value="${username}" placeholder="${PLACEHOLDER.GUEST_NAME}"/>
        </div>
        ${
          forNew
            ? `<input type="password" name="password" value="${password}" placeholder="${PLACEHOLDER.GUEST_PW}" autocomplete="new-password"/>`
            : `
            <div class="btn-container">
              <button type="button" data-action="cancel">취소</button>
              <button type="button" data-action="delete" class="delete-btn">삭제</button>
            </div>`
        }
      </div>
      <div class="item-footer">
        <textarea name="content" placeholder="${PLACEHOLDER.GUEST_CONTENT}">${content}</textarea>
        <button type="button" data-action="submit" class="submit-btn">완료</button>
      </div>
    `;
  }
}

export default WriteForm;
