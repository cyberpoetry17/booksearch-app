import { BookOverview, ViewedBook } from "../../types/index";
import ListItem from "./ListItem";

type ListProps = {
  books: BookOverview[];
  isLoading?: boolean;
  handleClick: (viewedBook: ViewedBook, coverId?: number) => void;
};

const List = ({ books, handleClick }: ListProps) => {
  return (
    <div className="flex flex-col w-full h-fit overflow-auto">
      <ul className="px-7">
        {books.length > 0 ? (
          books
            .filter(
              (book) => book.cover_i !== undefined && book.cover_i !== null
            )
            .map((book, index) => (
              <ListItem
                book={book}
                key={book.key ?? index}
                handleClick={(viewedBook: ViewedBook, coverId?: number) =>
                  handleClick(viewedBook, coverId)
                }
              />
            ))
        ) : (
          <>No data to show</>
        )}
      </ul>
    </div>
  );
};
export default List;
