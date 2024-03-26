import { Component } from "@notion/core";
import { GuestContent } from "@notion/types";

interface WriteFormProps {
  initial?: GuestContent;
  onSubmit: (guestContent: GuestContent) => void;
  onCancel?: VoidFunction;
  onDelete?: VoidFunction;
}

class WriteForm extends Component<WriteFormProps> {
  makeForm(): GuestContent {
    const username =
      this.findElement<HTMLInputElement>("[name='username']").value;
    const content =
      this.findElement<HTMLInputElement>("[name='content']").value;
    const password =
      this.findElement<HTMLInputElement>("[name='password']").value;
    const updateAt = "";
    const profile = {
      background: "",
      charactor: "",
    };

    return { username, content, password, updateAt, profile };
  }

  mounted(): void {
    this.addEvent("click", (target) => {
      const action = target.closest("button")?.dataset.action;
      const onSubmit = this.props?.onSubmit;
      const onCancel = this.props?.onCancel;
      const onDelete = this.props?.onDelete;

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
    const formForNew = Boolean(this.props?.initial);

    return `
      <div>
        <input name="username" value="${username}" placeholder="닉네임"/>
        <input name="content" value="${content}" placeholder="내용"/>
        <input name="password" value="${password}" placeholder="비밀번호"/>
        <button type="button" data-action="submit">완료</button>
        
        ${
          formForNew
            ? `
            <button type="button" data-action="cancel">취소</button>
            <button type="button" data-action="delete">삭제</button>`
            : ""
        }
      </div>
    `;
  }
}

export default WriteForm;
