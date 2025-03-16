import { BookOverview, ViewedBook } from "../../types/index";
import SpinningLoader from "../Loaders/LoadingScreen";
import NoData from "../NoData";
import ListItem from "./ListItem";

type ListProps = {
  books: BookOverview[];
  isLoading?: boolean;
  errorNoData?: boolean;
  errorFetching?: boolean;
  handleClick: (viewedBook: ViewedBook, coverId?: number) => void;
};

const BOOKS_NOT_FOUND_TEXT = "Ooops! Books not found!";
const ERROR_FETCHING_BOOKS_TEXT =
  "Ooops! Something went wrong while fetching books!";

const List = ({
  books,
  handleClick,
  errorFetching = false,
  isLoading = false,
  errorNoData = false,
}: ListProps) => {
  return (
    <div className="flex flex-col w-full overflow-auto">
      {books.length > 0 ? (
        <ul className="px-7">
          {books
            .filter(
              (book) => book.cover_i !== undefined && book.cover_i !== null
            )
            .map((book, index) => (
              <ListItem
                book={book}
                key={book.key ?? index}
                handleClick={(viewedBook: ViewedBook) =>
                  handleClick(viewedBook)
                }
              />
            ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-full">
          {isLoading ? (
            <SpinningLoader />
          ) : errorFetching ? (
            <NoData text={ERROR_FETCHING_BOOKS_TEXT} />
          ) : (
            errorNoData && <NoData text={BOOKS_NOT_FOUND_TEXT} />
          )}
        </div>
      )}
    </div>
  );
};
export default List;
