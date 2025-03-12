import BookOverview from "../../types/BookOverview";
import ListItem from "./ListItem";
import { getKey } from "./utils";

type ListProps = {
  books: BookOverview[];
  page?: number;
  isLoading?: boolean;
  handleClick: (id: string, coverId?: string) => void;
};

const List = ({ books, handleClick }: ListProps) => {
  return (
    <div className="flex flex-col w-full h-fit overflow-auto">
      <ul className="px-7">
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
    </div>
  );
};
export default List;
