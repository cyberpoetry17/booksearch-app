import { ReactNode } from "react";

type ButtonVariant = "default" | "load";

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: ButtonVariant;
};

const getStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case "default":
      return "bg-[#0056FF] text-white disabled:bg-neutral-300";
    case "load":
      return "bg-[#E7F0FC] text-[#497BDF] disabled:bg-neutral-300 disabled:text-white";
  }
};

const Button = ({
  onClick,
  children,
  variant = "default",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`p-1.5 px-2.5 w-fit rounded-[8px] cursor-pointer shadow-lg disabled:cursor-not-allowed ${getStyles(
        variant
      )}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
