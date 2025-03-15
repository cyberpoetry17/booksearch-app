import { ReactNode } from "react";

type CarouselButtonProps = {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
};

const CarouselButton = ({
  children,
  onClick,
  disabled = false,
}: CarouselButtonProps) => {
  return (
    <button
      className="text-2xl p-2 rounded-full disabled:cursor-not-allowed text-neutral-600  w-[50px] disabled:text-neutral-100"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CarouselButton;
