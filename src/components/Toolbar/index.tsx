import Search from "../Search";

type ToolbarProps = {
  searchTerm: string;
  handleSearchTerm: (term: string) => void;
  onSearchButtonClick: () => void;
};

const Toolbar = ({
  searchTerm,
  handleSearchTerm,
  onSearchButtonClick,
}: ToolbarProps) => {
  return (
    <div className="bg-white py-4 px-8 flex  h-fit w-full justify-between">
      <div className="flex gap-1.5">
        <Search
          searchTerm={searchTerm}
          handleSearch={handleSearchTerm}
          placeholder="Search by Title"
        />
        <button
          className="rounded-[8px] bg-[#0056FF] text-white cursor-pointer disabled:cursor-not-allowed shadow-lg p-1.5 px-2.5 disabled:bg-neutral-300"
          onClick={onSearchButtonClick}
          disabled={!searchTerm}
        >
          Search
        </button>
      </div>
      <img src="public/bookSearch.png" alt="Logo" className="h-[36px]"></img>
    </div>
  );
};

export default Toolbar;
