type BookDetailsLoaderProps = {
  length?: number;
};

const BookDetailsLoader = ({ length = 8 }: BookDetailsLoaderProps) => {
  const elements = Array.from({ length: length }, (_, index) => index + 1);
  return (
    <>
      {elements.map((_, index) => (
        <div
          className="animate-pulse h-[36px] bg-neutral-100 rounded-lg"
          key={index}
        />
      ))}
    </>
  );
};

export default BookDetailsLoader;
