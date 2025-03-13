import { useBooks } from "../../hooks/useBooks";
import Carousel from "./Carousel";

const BookHistory = () => {
  const { viewedBooks } = useBooks();
  console.log(viewedBooks, "is something");

  return viewedBooks.length > 0 ? (
    <div className="w-auto h-fit shrink-0 bg-white p-4 items-end rounded-2xl m-8">
      <h1 className="font-bold pb-2">Recently viewed</h1>
      <Carousel viewedBooks={viewedBooks} />
    </div>
  ) : null;
};

export default BookHistory;
