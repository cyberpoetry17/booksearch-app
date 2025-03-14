type ImageLoader = {
  type?: "small" | "medium" | "large";
};

const ImageLoader = ({ type = "small" }: ImageLoader) => {
  switch (type) {
    case "small":
      return (
        <div className="animate-pulse w-[40px] h-[60px] bg-neutral-200 shrink-0"></div>
      );
    case "medium":
      return (
        <div className="animate-pulse w-[70px] h-[100px] bg-neutral-200 shrink-0"></div>
      );
    case "large":
      return (
        <div className="bg-gray-300 hw-[320px] h-[500px] rounded shrink-0"></div>
      );
  }
};

export default ImageLoader;
