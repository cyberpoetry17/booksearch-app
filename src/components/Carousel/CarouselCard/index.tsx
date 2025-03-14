import { ViewedBook } from "../../../types";
import ImageLoader from "../../Loaders/Image";

type CarouselCard = {
  book: ViewedBook;
  handleClick?: (viewedBook: ViewedBook) => void;
  index: number | string;
};

const CarouselCard = ({ book, handleClick, index }: CarouselCard) => {
  const { imageUrl, title } = book;
  return (
    <div
      className="flex flex-col h-[150px] max-w-[100px] items-center cursor-pointer p-2"
      onClick={() => handleClick?.(book)}
      key={index}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Book ${book.key}`}
          className="w-[70px] h-[100px] rounded-sm "
        />
      ) : (
        <ImageLoader type="medium" />
      )}
      <span className="max-w-[100px] text-center font-light">{title}</span>
    </div>
  );
};

export default CarouselCard;
