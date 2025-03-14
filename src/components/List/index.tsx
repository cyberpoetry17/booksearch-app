import NoData from "../../assets/icons/NoData";
import { BookOverview, ViewedBook } from "../../types/index";
import SpinningLoader from "../Loaders/LoadingScreen";
import ListItem from "./ListItem";

type ListProps = {
  books: BookOverview[];
  isLoading?: boolean;
  errorNoData?: boolean;
  handleClick: (viewedBook: ViewedBook, coverId?: number) => void;
};

const BOOKS_NOT_FOUND = "Ooops! Books not found!";

const List = ({
  books,
  handleClick,
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
          {isLoading && <SpinningLoader />}
          {!isLoading && errorNoData && (
            <h1 className="flex flex-col items-center font-bold text-neutral-400">
              <NoData className="w-[100px] h-[100px]  justify-center items-center " />
              {BOOKS_NOT_FOUND}
            </h1>
          )}
        </div>
      )}
    </div>
  );
};
export default List;
