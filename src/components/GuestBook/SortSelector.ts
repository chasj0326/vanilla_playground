import { Component, navigate } from "@notion/core";

interface SortSelectorProps {
  sort: "latest" | "oldest";
  onSelect: (sort: "latest" | "oldest") => void;
}

class SortSelector extends Component<SortSelectorProps> {
  mounted(): void {
    this.addEvent("click", ({ id }) => {
      if (id === "latest" || id === "oldest") {
        navigate(`/guest?sort=${id}`);
        this.props?.onSelect(id);
      }
    });
  }
  template(): string {
    const { sort } = this.props ?? {};

    return `
      <button id="latest" class="${sort === "latest" ? "active" : ""}">최신순</button>
      <button id="oldest" class="${sort === "oldest" ? "active" : ""}">오래된순</button>
    `;
  }
}

export default SortSelector;
