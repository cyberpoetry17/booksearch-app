import { BookOverview } from "../../types/index";

export const getLanguages = (book: BookOverview) =>
  book.language?.reduce(
    (accumulator, currentValue) => accumulator + (currentValue ?? "") + ", ",
    ""
  );

export const getKey = (key: string) => key.split("/")[2];
