import Button from "../Button";
import Search from "../Search";

type ToolbarProps = {
  searchTerm: string;
  handleSearchTerm: (term: string) => void;
  onSearchButtonClick: () => void;
};

const SEARCH_BY_TITLE_PLACEHOLDER = "Search book by Title";
const SEARCH_BUTTON_TEXT = "Search";

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
          placeholder={SEARCH_BY_TITLE_PLACEHOLDER}
        />
        <Button
          onClick={onSearchButtonClick}
          disabled={!searchTerm}
          text={SEARCH_BUTTON_TEXT}
        />
      </div>
      <img src="public/bookSearch.png" alt="Logo" className="h-[36px]"></img>
    </div>
  );
};

export default Toolbar;
