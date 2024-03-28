import { Component, navigate } from "@core";
import { router } from "@notion/main";
import { directoryData, store } from "@notion/store";
import { notion } from "@notion/services";
import { DirectoryData, RootDocuments } from "@notion/types";
import {
  changeDocumentTitle,
  changeFavicon,
  splitTitleWithEmoji,
} from "@notion/utils";
import { PLACEHOLDER, STORE_KEY } from "@notion/constants";

class Directory extends Component {
  created(): void {
    store.subscribe([directoryData], {
      key: STORE_KEY.DIRECTORY,
      func: () => this.render(),
    });
  }

  mounted() {
    const { params } = router.match() || {};
    notion.getRootDocuments(Number(params?.id));
    const setDirectoryData = store.setData<DirectoryData>(directoryData);

    this.addEvent("click", (target) => {
      const documentId = target.closest("li")?.id;
      const action = target.closest("button")?.dataset.action;

      if (!documentId) return;

      switch (action) {
        case "toggle": {
          notion.toggleDocument(Number(documentId));
          break;
        }
        case "create": {
          notion.createDocument(documentId ? Number(documentId) : null);
          break;
        }
        case "delete": {
          notion.deleteDocument(Number(documentId));
          break;
        }
        default: {
          setDirectoryData((prev) => ({
            ...prev,
            currentId: Number(documentId),
          }));
          navigate(`/${documentId}`);
        }
      }

      window.addEventListener("popstate", () => {
        const route = router.match() ?? {};
        const documentId = route.params?.id ?? "";
        const setDirectoryData = store.setData<DirectoryData>(directoryData);
        setDirectoryData((prev) => ({
          ...prev,
          currentId: Number(documentId),
        }));

        if (route.path === "/") {
          changeDocumentTitle();
          changeFavicon();
        }
      });
    });
  }

  template() {
    const { currentId, rootDocuments, toggleData } =
      store.getData<DirectoryData>(directoryData);

    const renderDocument = (
      rootDocuments: RootDocuments,
      depth: number,
    ): string => {
      if (rootDocuments.length === 0) {
        return `
        <div class='document-holder' style='--depth: ${depth}'>
          ${depth ? "하위" : ""} 페이지 없음
        </div>`;
      }
      return `
        <ul>${rootDocuments
          .map(({ id, title, documents }) => {
            const [emojiValue, titleValue] = splitTitleWithEmoji(title || "");
            return `
            <li id='${id}' class='${id === currentId ? "current" : ""}'>
              <div class='title-container' style='--depth: ${depth}'>
                <button data-action='toggle'>
                  <i class="fa-solid fa-chevron-${
                    toggleData[id] ? "down" : "right"
                  }"></i>
                </button>
                <div class='title'>
                  <span class='emoji'> ${
                    emojiValue || '<i class="fa-regular fa-file-lines"></i>'
                  }</span>
                  <span>${titleValue || PLACEHOLDER.DOCUMENT_TITLE}</span>
                </div>
              </div>
              <div class='button-container'>
                <button data-action='delete'>
                  <i class="fa-solid fa-minus"></i>
                </button>
                <button data-action='create'>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </li>
            ${toggleData[id] ? renderDocument(documents, depth + 1) : ""}
          `;
          })
          .join("")}
        </ul>
     `;
    };

    return `
        ${renderDocument(rootDocuments, 0)}
    `;
  }
}

export default Directory;
