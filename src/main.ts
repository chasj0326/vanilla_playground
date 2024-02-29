import RichEditor from "./components/RichEditor";
import App from "@notion/App";
import "@notion/style/style.css";
import { createRouter } from "@core";
import { DocumentPage, MainPage } from "@notion/pages";

const $app = document.querySelector<HTMLElement>("#app");
if ($app) {
  new App({ target: $app });
}

export const router = createRouter([
  {
    path: "/",
    component: MainPage,
    children: [
      {
        path: "/rich",
        component: RichEditor,
      },
      {
        path: "/:id",
        component: DocumentPage,
      },
    ],
  },
]);

router.init();
