import { useEffect, useState } from "react";
import Search from "../components/Search";
import BookOverview from "../types/BookOverview";
// import { useNavigate } from "react-router";
import List from "../components/List";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<BookOverview[]>([]);
  const [page, setPage] = useState(1);

  const [displayedBooks, setDisplayedBooks] = useState<BookOverview[]>([]);
  const [loading, setLoading] = useState(false);
  const booksPerPage = 10;

  const fetchBooks = async (searchTerm: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchTerm}`
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
    fetchBooks(searchTerm);
  }, [searchTerm]);

  const loadMoreBooks = () => {
    const start = page * booksPerPage;
    const end = start + booksPerPage;

    setDisplayedBooks((prev) => [...prev, ...books.slice(start, end)]);

    setPage((prev) => prev + 1);
  };

  return (
    <div className=" bg-neutral-100 flex flex-col gap-9 overflow-hidden">
      <div className="bg-white py-4 px-8">
        <Search
          searchTerm={searchTerm}
          handleSearch={(term) => setSearchTerm(term)}
          placeholder="Search by Title"
        />
      </div>
      {displayedBooks && (
        <div className=" my-6 w-full h-fit overflow-auto">
          <List books={displayedBooks} />
        </div>
      )}
      {searchTerm.length > 0 && displayedBooks.length < books.length && (
        <button
          className="p-2 border disabled:border-amber-300"
          onClick={loadMoreBooks}
          disabled={loading || displayedBooks.length === books.length}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};
export default Home;
