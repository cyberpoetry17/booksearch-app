import { useState, useEffect, useRef } from "react";
import { ViewedBook } from "../../types";
import LeftArrowIcon from "../../assets/icons/LeftArrow";
import RightArrowIcon from "../../assets/icons/RightArrow";
import CarouselCard from "./CarouselCard";

type CarouselProps = {
  viewedBooks: ViewedBook[];
};

const Carousel = ({ viewedBooks }: CarouselProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const calculateItemsPerPage = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const itemWidth = 100;
      const gapWidth = 16;

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

    let visibleBooks = viewedBooks.slice(startIndex, startIndex + itemsPerPage);

    if (viewedBooks.length < itemsPerPage) {
      //
    } else {
      if (visibleBooks.length < itemsPerPage) {
        const overflowCount = itemsPerPage - visibleBooks.length;
        visibleBooks = visibleBooks.concat(viewedBooks.slice(0, overflowCount));
      }
    }

    return visibleBooks;
  };
  const visibleBooks = getVisibleBooks(viewedBooks, startIndex, itemsPerPage);

  const handlePrevious = () => {
    setStartIndex(
      (prev) => (prev - 1 + viewedBooks.length) % viewedBooks.length
    );
  };

  const handleNext = () =>
    setStartIndex((prev) => (prev + 1) % viewedBooks.length);

  return (
    <div className="flex items-center justify-center gap-4 w-full relative">
      <button
        className="text-2xl p-2 rounded-full disabled:cursor-not-allowed disabled:bg-red w-[50px]"
        onClick={handlePrevious}
        disabled={viewedBooks.length < itemsPerPage}
      >
        <LeftArrowIcon className="w-[20px] h-[30px] text-neutral-600 cursor-pointer" />
      </button>

      <div
        ref={carouselRef}
        className="flex w-full overflow-hidden justify-start"
      >
        <div className="flex gap-4 transition-transform duration-300">
          {visibleBooks.map((book, index) => (
            <CarouselCard
              index={index}
              url={book.imageUrl}
              title={book.title}
            />
          ))}
        </div>
      </div>

      <button
        className="text-2xl p-2 rounded-full  w-[50px] disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={viewedBooks.length < itemsPerPage}
      >
        <RightArrowIcon className="w-[20px] h-[30px] text-neutral-600 cursor-pointer" />
      </button>
    </div>
  );
};

export default Carousel;
