import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BookOverview from "../types/BookOverview";
import Search from "../components/Search";
import List from "../components/List";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const [books, setBooks] = useState<BookOverview[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<BookOverview[]>([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const booksPerPage = 7;

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timeout);
  }, [navigate, searchTerm]);

  const fetchBooks = async (debouncedTerm: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${debouncedTerm}`
      );
      const data = await response.json();

      const filteredBooks = (data.docs as BookOverview[]).filter(
        (book) => book.cover_i !== null && book.cover_i !== undefined
      );

      setBooks(filteredBooks);
      setDisplayedBooks(filteredBooks.slice(0, booksPerPage));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(debouncedTerm);
  }, [debouncedTerm]);

  const loadMoreBooks = () => {
    const startIndex = page * booksPerPage;
    const endIndex = startIndex + booksPerPage;

    setDisplayedBooks((previous) => [
      ...previous,
      ...books.slice(startIndex, endIndex),
    ]);

    setPage((previousPage) => previousPage + 1);
  };

  const handleClick = (id: string, coverId?: string) => {
    navigate(`/book/${id}/${coverId}`);
  };

  return (
    <div className=" bg-neutral-100 flex flex-col gap-9 overflow-hidden justify-between">
      <div className="bg-white py-4 px-8">
        <Search
          searchTerm={searchTerm}
          handleSearch={(term) => setSearchTerm(term)}
          placeholder="Search by Title"
        />
      </div>

      {displayedBooks && (
        <List books={displayedBooks} handleClick={handleClick} />
      )}
      {debouncedTerm.length > 0 && displayedBooks.length < books.length && (
        <div className="flex justify-center items-center">
          <button
            className="p-1.5 px-2.5 w-fit rounded-[8px] bg-blue-500 text-white cursor-pointer disabled:cursor-not-allowed shadow-lg"
            onClick={loadMoreBooks}
            disabled={loading || displayedBooks.length === books.length}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      <div className="w-full h-[100px] shrink-0 bg-white">
        this is gonna be something else
      </div>
    </div>
  );
};
export default Home;
