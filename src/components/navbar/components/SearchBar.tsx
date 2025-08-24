import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="border-b border-black flex items-center gap-2 py-1 w-fit">
      <CiSearch className="w-5 h-5" />
      <input
        className="text-sm border-none outline-none focus:outline-none"
        type="text"
        placeholder="Search for perfumes..."
      />
    </div>
  );
};

export default SearchBar;
