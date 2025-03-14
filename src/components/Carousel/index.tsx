import { useState, useEffect, useRef } from "react";
import { ViewedBook } from "../../types";
import LeftArrowIcon from "../../assets/icons/LeftArrow";
import RightArrowIcon from "../../assets/icons/RightArrow";
import CarouselCard from "./CarouselCard";
import CarouselButton from "./CarouselButton";

type CarouselProps = {
  viewedBooks: ViewedBook[];
  handleClick: (viewedBook: ViewedBook) => void;
};
const ITEM_WIDTH = 100;
const GAP_WIDTH = 16;

const Carousel = ({ viewedBooks, handleClick }: CarouselProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const calculateItemsPerPage = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const itemWidth = ITEM_WIDTH;
      const gapWidth = GAP_WIDTH;

      const itemWithGap = itemWidth + gapWidth;

      const itemsInView = Math.floor(containerWidth / itemWithGap);

      const remainingSpace = containerWidth - itemsInView * itemWithGap;

      if (remainingSpace >= itemWidth) {
        setItemsPerPage(itemsInView + 1);
      } else {
        setItemsPerPage(itemsInView);
      }
      setStartIndex((prev) => prev);
    }
  };

  useEffect(() => {
    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);
    return () => {
      window.removeEventListener("resize", calculateItemsPerPage);
    };
  }, []);

  const getVisibleBooks = (
    viewedBooks: ViewedBook[],
    startIndex: number,
    itemsPerPage: number
  ) => {
    const totalBooks = viewedBooks.length;

    if (totalBooks === 0) return [];

    let visibleBooks;

    if (viewedBooks.length < itemsPerPage) visibleBooks = [...viewedBooks];
    else {
      visibleBooks = viewedBooks.slice(startIndex, startIndex + itemsPerPage);
      if (visibleBooks.length < itemsPerPage) {
        const overflowCount = itemsPerPage - visibleBooks.length;
        visibleBooks = visibleBooks.concat(viewedBooks.slice(0, overflowCount));
      }
    }

    return visibleBooks;
  };

  const visibleBooks = getVisibleBooks(viewedBooks, startIndex, itemsPerPage);

  const handlePrevious = () =>
    setStartIndex(
      (prev) => (prev - 1 + viewedBooks.length) % viewedBooks.length
    );

  const handleNext = () =>
    setStartIndex((prev) => (prev + 1) % viewedBooks.length);

  return (
    <div className="flex items-center justify-center gap-4 min-w-[100px] relative">
      <CarouselButton
        onClick={handlePrevious}
        disabled={viewedBooks.length < itemsPerPage}
      >
        <LeftArrowIcon className="w-[20px] h-[30px] cursor-pointer" />
      </CarouselButton>
      <div
        ref={carouselRef}
        className="flex w-full overflow-hidden justify-start"
      >
        <div className="flex gap-4">
          {visibleBooks.map((book, index) => (
            <CarouselCard
              book={book}
              handleClick={handleClick}
              index={book.key ?? index}
            />
          ))}
        </div>
      </div>
      <CarouselButton
        onClick={handleNext}
        disabled={viewedBooks.length < itemsPerPage}
      >
        <RightArrowIcon className="w-[20px] h-[30px] cursor-pointer" />
      </CarouselButton>
    </div>
  );
};

export default Carousel;
