import { makeRequest, transformAPI } from "@notion/core";
import { notionApi } from "@notion/api";
import { guestBookData, store } from "@notion/store";
import {
  DetailDocument,
  GuestBookData,
  GuestContent,
  UpdateDocumentRequestBody,
} from "@notion/types";

const { reduceRequest, expandResponse } = transformAPI<
  UpdateDocumentRequestBody,
  {
    title: string;
    content: GuestBookData;
  }
>({
  content: {},
});
const GUESTBOOK_ID = Number(import.meta.env.VITE_GUESTBOOK_ID);

const getGuestBooks = () => {
  const setGuestBookData = store.setData(guestBookData);
  makeRequest<GuestBookData>(() => notionApi.getDetail(GUESTBOOK_ID), {
    select: (data: DetailDocument) => {
      const { title, content } = data;
      return expandResponse({ title, content: content || "" }).content;
    },
    onSuccess: (data) => {
      setGuestBookData(data);
    },
  });
};

const mutateGuestBooks = (newGuestBooks: Record<string, GuestContent>) => {
  makeRequest(
    () =>
      notionApi.update(
        GUESTBOOK_ID,
        reduceRequest({
          title: "방명록",
          content: newGuestBooks,
        }),
      ),
    {
      onSuccess: () => {
        getGuestBooks();
      },
    },
  );
};

const createGuestBook = (newBook: GuestContent) => {
  const updated = new Date();
  const dateInfo = [
    updated.getFullYear(),
    `${updated.getMonth() + 1}`.padStart(2, "0"),
    `${updated.getDate()}`.padStart(2, "0"),
  ];
  const updateAt = `${dateInfo.join("-")}`;
  const newId = `${new Date().getTime()}`;
  const guestBooks = store.getData<GuestBookData>(guestBookData);
  mutateGuestBooks({ ...guestBooks, [newId]: { ...newBook, updateAt } });
};

const updateGuestBook = (id: string, newBook: GuestContent) => {
  const guestBooks = store.getData<GuestBookData>(guestBookData);
  mutateGuestBooks({
    ...guestBooks,
    [id]: { ...newBook },
  });
};

const deleteGuestBook = (id: string) => {
  const guestBooks = store.getData<GuestBookData>(guestBookData);
  delete guestBooks[id];
  mutateGuestBooks(guestBooks);
};

const guestBook = {
  getGuestBooks,
  createGuestBook,
  updateGuestBook,
  deleteGuestBook,
};

export default guestBook;
