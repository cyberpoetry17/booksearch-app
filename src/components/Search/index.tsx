type SearchProps = {
  searchTerm: string;
  handleSearch: (searchTerm: string) => void;
  placeholder?: string;
};

const Search = ({ searchTerm, handleSearch, placeholder }: SearchProps) => (
  <input
    className="bg-[#F0F5FF] border border-gray-300 rounded-[8px] p-[4px] w-fit focus:outline-none text-neutral-800"
    value={searchTerm}
    onChange={(e) => {
      handleSearch(e.target.value.toLowerCase());
    }}
    placeholder={placeholder}
  />
);

export default Search;
