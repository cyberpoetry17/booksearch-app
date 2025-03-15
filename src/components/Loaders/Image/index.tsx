type ImageLoader = {
  type?: "small" | "medium" | "large" | "background";
};

// const DEFAULT_STYLES =
//   "animate-pulse w-[40px] h-[60px] bg-neutral-200 shrink-0 z-20";

const ImageLoader = ({ type = "small" }: ImageLoader) => {
  switch (type) {
    case "small":
      return (
        <div className="animate-pulse w-[40px] h-[60px] bg-neutral-200 shrink-0 z-20"></div>
      );
    case "medium":
      return (
        <div className="animate-pulse w-[70px] h-[100px] bg-neutral-200 shrink-0 z-20"></div>
      );
    case "large":
      return (
        <div className="bg-gray-200 animate-pulse rounded md:h-[600px] md:w-[400px] w-[100px] h-[150px] z-20"></div>
      );
  }
};

export default ImageLoader;
