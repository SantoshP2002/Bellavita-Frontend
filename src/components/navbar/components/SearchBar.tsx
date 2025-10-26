import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useDebounce } from "../../../hooks/useDebounce";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div className="border-b border-black flex items-center gap-2 py-2 w-fit">
      <CiSearch className="w-5 h-5" />
      <input
        className="text-sm border-none outline-none focus:outline-none"
        type="text"
        placeholder="Search for perfumes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
