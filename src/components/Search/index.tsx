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
        className="bg-slate-100 border border-gray-300 rounded-[8px] p-[4px] w-fit focus:outline-none"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
};
export default Search;
