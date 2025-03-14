import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import Search from "../components/Search";
import List from "../components/List";
import { BookOverview, ViewedBook } from "../types";
import { useBooks } from "../hooks/useBooks";
import { getKey } from "../components/List/utils";
import BookHistory from "../components/BookHistory";

const BOOKS_PER_PAGE = 7;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    books,
    setBooks,
    displayedBooks,
    setDisplayedBooks,
    page,
    setPage,
    viewedBooks,
    setViewedBooks,
  } = useBooks();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchBooks = useCallback(
    async (searchTerm: string) => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${searchTerm.trim()}`
        );
        const data = await response.json();

        const filteredBooks = (data.docs as BookOverview[]).filter(
          (book) => book.cover_i !== null && book.cover_i !== undefined
        );

        setBooks(filteredBooks);
        setDisplayedBooks(filteredBooks.slice(0, BOOKS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    },
    [setBooks, setDisplayedBooks]
  );

  const loadMoreBooks = () => {
    const startIndex = page * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;

    setDisplayedBooks((previous: BookOverview[]) => [
      ...previous,
      ...books.slice(startIndex, endIndex),
    ]);

    setPage((previousPage: number) => previousPage + 1);
  };

  const handleClick = (viewedBook: ViewedBook, coverId?: number) => {
    navigate(`/book/${getKey(viewedBook.key)}/${coverId}`);
    if (!viewedBooks.find((book) => book.key === viewedBook.key))
      setViewedBooks((previous) => [...previous, viewedBook]);
  };

  const handleSearch = () => {
    fetchBooks(searchTerm);
  };

  return (
    <div className=" bg-[#EAF0F5] flex flex-col gap-9 overflow-hidden justify-between">
      <div className="bg-white py-4 px-8 flex gap-1.5 ">
        <Search
          searchTerm={searchTerm}
          handleSearch={(term) => setSearchTerm(term)}
          placeholder="Search by Title"
        />
        <button
          className="rounded-[8px] bg-[#0056FF] text-white cursor-pointer disabled:cursor-not-allowed shadow-lg p-1.5 px-2.5"
          onClick={handleSearch}
          disabled={!searchTerm}
        >
          Search
        </button>
      </div>

      {displayedBooks && (
        <List books={displayedBooks} handleClick={handleClick} />
      )}
      {displayedBooks.length > 0 && displayedBooks.length <= books.length && (
        <div className="flex justify-center items-center">
          <button
            className="p-1.5 px-2.5 w-fit rounded-[8px] bg-[#E7F0FC] text-[#497BDF] cursor-pointer disabled:cursor-not-allowed shadow-lg"
            onClick={loadMoreBooks}
            disabled={loading || displayedBooks.length === books.length}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      <BookHistory />
    </div>
  );
};
export default Home;
