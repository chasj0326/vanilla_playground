import { Component } from "@core";
import { router } from "@notion/main";
import { Editor } from "@notion/components";

class DocumentPage extends Component {
  template() {
    return `
     <div class='editor'></div>
    `;
  }

  mounted(): void {
    const { params } = router.match() || {};
    const documentId = Number(params?.id);

    this.addComponent(Editor, {
      selector: ".editor",
      props: {
        documentId,
      },
    });
  }
}

export default DocumentPage;
