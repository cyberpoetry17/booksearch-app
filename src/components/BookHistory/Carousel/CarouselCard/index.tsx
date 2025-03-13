type CarouselCard = {
  index: number;
  url: string;
  title: string;
};

const CarouselCard = ({ index, url, title }: CarouselCard) => {
  return (
    <div className="flex flex-col w-[100px] h-[150px] shrink-0 items-center  cursor-pointer z-10 p-2">
      <img
        key={index}
        src={url}
        alt={`Book ${index}`}
        className="w-[70px] h-[100px] rounded-sm shrink-0"
      />
      <h1 className="wrap overflow-hidden text-ellipsis whitespace-normal shrink">
        {title}
      </h1>
    </div>
  );
};

export default CarouselCard;
