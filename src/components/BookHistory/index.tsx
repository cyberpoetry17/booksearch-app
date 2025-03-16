import { useBooks } from "../../hooks/useBooks";
import { ViewedBook } from "../../types";
import Carousel from "../Carousel";

type BookHistoryProps = {
  handleClick: (viewedBook: ViewedBook) => void;
};

const RECENTLY_VIEWED_TEXT = "Recently viewed";

const BookHistory = ({ handleClick }: BookHistoryProps) => {
  const { viewedBooks } = useBooks();

  return viewedBooks.length > 0 ? (
    <div className="w-auto h-fit shrink-0 bg-white p-4 items-end rounded-2xl mx-8">
      <h1 className="font-bold pb-2 text-neutral-700">
        {RECENTLY_VIEWED_TEXT}
      </h1>
      <Carousel viewedBooks={viewedBooks} handleClick={handleClick} />
    </div>
  ) : null;
};

export default BookHistory;
