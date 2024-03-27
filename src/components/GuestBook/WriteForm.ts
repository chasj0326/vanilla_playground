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

interface WriteFormState {
  warning: string;
  writing: {
    username: string;
    password: string;
    content: string;
  };
}

class WriteForm extends Component<WriteFormProps, WriteFormState> {
  getInput(name: string) {
    return this.findElement<HTMLTextAreaElement | HTMLInputElement>(
      `[name='${name}']`,
    ).value;
  }

  makeForm(): GuestContent {
    const forNew = this.props?.forNew;

    const baseContent = {
      username: this.getInput("username").trim(),
      content: this.getInput("content").trim(),
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

  checkForm(formContent: GuestContent) {
    const { username, password, content } = formContent;
    const forNew = this.props?.forNew;
    const writing = { username, password, content };

    if (username.length > 12 || username.length < 1) {
      this.setState({
        writing: {
          ...writing,
          username: "",
        },
        warning: "닉네임은 1자 이상, 최대 12자 입니다.",
      });
      return false;
    }
    if (!/^\d{6}$/.test(password) && forNew) {
      this.setState({
        writing: {
          ...writing,
          password: "",
        },
        warning: "비밀번호는 6자리 숫자여야 합니다.",
      });
      return false;
    }
    if (content.length === 0) {
      this.setState({
        writing: { ...writing },
        warning: "내용을 입력해 주세요.",
      });
      return false;
    }
    return true;
  }

  mounted(): void {
    this.addEvent("click", (target) => {
      const action = target.closest("button")?.dataset.action;
      const { onSubmit, onCancel, onDelete } = this.props ?? {};

      if (!onSubmit) return;

      switch (action) {
        case "submit": {
          const formContent = this.makeForm();
          if (this.checkForm(formContent)) onSubmit(formContent);
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
    } = this.state?.writing ?? this.props?.initial ?? {};
    const forNew = this.props?.forNew;
    const { warning } = this.state ?? {};

    return `
      <div class='item-header'>
        <div class='info-block'>
          <div class='profile'></div>
          <input name="username" value="${username}" placeholder="${PLACEHOLDER.GUEST_NAME}"/>
        </div>
        ${
          forNew
            ? `<input 
                type="password" 
                name="password" 
                value="${password}" 
                placeholder="${PLACEHOLDER.GUEST_PW}" 
                autocomplete="new-password"
              />`
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
      ${warning ? `<div class='warning'>${warning}</div>` : ``}
    `;
  }
}

export default WriteForm;
