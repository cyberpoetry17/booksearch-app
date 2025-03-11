type SearchProps = {
  searchTerm: string;
  handleSearch: (newSearchTerms: string) => void;
  placeholder?: string;
};

const Search = ({ searchTerm, handleSearch, placeholder }: SearchProps) => {
  return (
    <>
      <label></label>
      <input
        className="bg-white border border-gray-300 rounded-[8px] p-2 w-full hover:border-blue-500 focus:border-blue-500 focus:outline-none"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
};
export default Search;
