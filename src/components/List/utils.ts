import { BookOverview } from "../../types/index";

export const getLanguages = (book: BookOverview) =>
  book.language?.filter(Boolean).join(", ") || "";

export const getAuthors = (authors: string[]) =>
  authors?.filter(Boolean).join(", ") || "";

export const getKey = (key: string) => key.split("/")[2];
