type ImageLoader = {
  type?: "small" | "medium" | "large" | "background";
};
const STYLES = "animate-pulse bg-neutral-200 z-20 shrink-0 ";

const ImageLoader = ({ type = "small" }: ImageLoader) => {
  switch (type) {
    case "small":
      return <div className={`${STYLES} w-[40px] h-[60px]`}></div>;
    case "medium":
      return <div className={`${STYLES} w-[70px] h-[100px]`}></div>;
    case "large":
      return (
        <div className="bg-gray-200 animate-pulse rounded md:h-[600px] md:w-[400px] w-[100px] h-[150px] z-20"></div>
      );
  }
};

export default ImageLoader;
