import BookOverview from "../../../types/BookOverview";
import { getLanguages } from "../utils";

type ListItemProps = {
  book: BookOverview;
  handleClick: (id: string, coverId?: number) => void;
};

const ListItem = ({ book, handleClick }: ListItemProps) => {
  return (
    <li
      key={book.key}
      className="bg-white flex my-4 h-[100px]  rounded-2xl"
      onClick={() => handleClick(book.key, book.cover_i)}
    >
      <div className="bg-red w-1/5 p-1.5">
        <img alt="hi" height={24} width={24} />
      </div>
      <div className="flex flex-col flex-1">
        <span>{book.title}</span>
        <span>{getLanguages(book)}</span>
        <span>{book.subtitle}</span>
      </div>
    </li>
  );
};

export default ListItem;
