import NoDataIcon from "../../assets/icons/NoData";

type NoDataProps = {
  text: string;
};

const NoData = ({ text }: NoDataProps) => {
  return (
    <div className="flex flex-col justify-center items-center font-bold  text-neutral-400 ">
      <NoDataIcon className="w-[100px] h-[100px] self-center" />
      {text}
    </div>
  );
};

export default NoData;
