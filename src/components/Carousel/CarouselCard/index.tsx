import { ViewedBook } from "../../../types";
import ImageLoader from "../../Loaders/Image";

type CarouselCard = {
  book: ViewedBook;
  index: number;
  handleClick?: (viewedBook: ViewedBook) => void;
};

const CarouselCard = ({ book, index, handleClick }: CarouselCard) => {
  const { imageUrl, title } = book;
  return (
    <div
      className="flex flex-col w-[100px] h-[150px] shrink-0 items-center cursor-pointer z-10 p-2"
      onClick={() => handleClick?.(book)}
    >
      {imageUrl ? (
        <img
          key={index}
          src={imageUrl}
          alt={`Book ${index}`}
          className="w-[70px] h-[100px] rounded-sm shrink-0"
        />
      ) : (
        <ImageLoader type="medium" />
      )}
      <span className=" relative shrink-0 whitespace-nowrap overflow-ellipsis overflow-hidden truncate w-[100px] text-center font-light">
        {title}
      </span>
    </div>
  );
};

export default CarouselCard;
