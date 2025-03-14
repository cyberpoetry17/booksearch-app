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
      className="flex flex-col min-w-[100px] h-[150px] items-center cursor-pointer z-10 p-2"
      onClick={() => handleClick?.(book)}
      key={index}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Book ${book.key}`}
          className="w-[70px] h-[100px] rounded-sm shrink-0"
        />
      ) : (
        <ImageLoader type="medium" />
      )}
      <span className="relative whitespace-nowrap overflow-ellipsis overflow-hidden truncate w-[100px] text-center font-light">
        {title}
      </span>
    </div>
  );
};

export default CarouselCard;
