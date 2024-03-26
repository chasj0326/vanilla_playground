import { Component } from "@notion/core";
import { GuestContent } from "@notion/types";

interface WriteFormProps {
  initial?: GuestContent;
  onSubmit: VoidFunction;
  onCancel: VoidFunction;
}

class WriteForm extends Component<WriteFormProps> {
  template(): string {
    const {
      username = "",
      content = "",
      password = "",
    } = this.props?.initial ?? {};
    return `
      <form>
        <input id="username" value="${username}"/>
        <input id="content" value="${content}"/>
        <input id="password" value="${password}"/>
        <button>완료</button>
      </form>
    `;
  }
}

export default WriteForm;
