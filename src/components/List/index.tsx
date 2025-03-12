import BookOverview from "../../types/BookOverview";
import ListItem from "./ListItem";
import { getKey, getRange } from "./utils";

type ListProps = {
  books: BookOverview[];
  page?: number;
  isLoading?: boolean;
  handleLoadMore?: () => void;
  handlePage: (page: number) => void;
  handleClick: (id: string, coverId?: string) => void;
};

const List = ({
  books,
  handleClick,
  isLoading,
  hasMore,
  page = 1,
}: ListProps) => {
  return (
    <div className="flex flex-col">
      <ul className="px-7 ">
        {books
          .filter((book) => book.cover_i !== undefined && book.cover_i !== null)
          .map((book, index) => (
            <ListItem
              book={book}
              key={book.key ?? index}
              handleClick={(id: string, coverId?: number) =>
                handleClick(getKey(id), coverId?.toString())
              }
            />
          ))}
      </ul>

      {hasMore && !isLoading && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};
export default List;
