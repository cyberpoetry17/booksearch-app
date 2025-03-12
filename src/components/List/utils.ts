import BookOverview from "../../types/BookOverview";
import _ from "lodash";

export const getLanguages = (book: BookOverview) =>
  book.language?.reduce(
    (accumulator, currentValue) => accumulator + (currentValue ?? "") + ", ",
    ""
  );

export const getKey = (key: string) => key.split("/")[2];

export const getRange = (currentPage: number, totalPages: number) => {
  const TOTAL_VISIBLE = 7;
  if (totalPages <= TOTAL_VISIBLE) return _.range(1, totalPages + 1);

  //from here

  if (currentPage <= TOTAL_VISIBLE - 2)
    return [..._.range(1, TOTAL_VISIBLE), "...", totalPages];

  if (currentPage >= totalPages - (TOTAL_VISIBLE - 3)) {
    return [
      1,
      "...",
      ..._.range(totalPages - (TOTAL_VISIBLE - 2), totalPages + 1),
    ];
  }

  return _.compact([
    1,
    "...",
    ..._.range(currentPage - 3, currentPage + 4),
    "...",
    totalPages,
  ]);
};
