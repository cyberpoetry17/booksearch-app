import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { BookOverview, ViewedBook } from "../types";
import { useBooks } from "../hooks/useBooks";
import { getKey } from "../components/List/utils";
import BookHistory from "../components/BookHistory";
import SpinningLoader from "../components/Loaders/LoadingScreen";
import List from "../components/List";
import Toolbar from "../components/Toolbar";

const BOOKS_PER_PAGE = 7;

const Home = () => {
  const {
    books,
    searchTerm,
    setSearchTerm,
    setBooks,
    displayedBooks,
    setDisplayedBooks,
    page,
    setPage,
    viewedBooks,
    setViewedBooks,
    setAuthors,
  } = useBooks();

  const [loading, setLoading] = useState(false);
  const [errorNoData, setErrorNoData] = useState(false);

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

        if (!filteredBooks.length || !(data.docs as BookOverview[]).length)
          setErrorNoData(true);
        else setErrorNoData(false);

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

  const handleOnBookClick = (viewedBook: ViewedBook) => {
    if (!viewedBooks.find((book) => book.key === viewedBook.key))
      setViewedBooks((previous) => [...previous, viewedBook]);

    setAuthors(
      displayedBooks.find((book) => book.key === `${viewedBook.key}`)
        ?.author_name ?? []
    );

    navigate(`/book/${getKey(viewedBook.key)}/${viewedBook.coverId}`);
  };

  const handleSearchTerm = (term: string) => setSearchTerm(term);

  const onSearchButtonClick = () => fetchBooks(searchTerm);

  return (
    <div className=" bg-[#EAF0F5] grid grid-rows-[auto_1fr_auto] overflow-hidden gap-2 pb-2 h-screen">
      <Toolbar
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}
        onSearchButtonClick={onSearchButtonClick}
      />
      {displayedBooks && (
        <List
          isLoading={loading}
          books={displayedBooks}
          handleClick={handleOnBookClick}
          errorNoData={errorNoData}
        />
      )}
      {displayedBooks.length > 0 && displayedBooks.length <= books.length && (
        <div className="flex justify-center items-center">
          {loading ? (
            <SpinningLoader />
          ) : (
            <button
              className="p-1.5 px-2.5 w-fit rounded-[8px] bg-[#E7F0FC] text-[#497BDF] cursor-pointer disabled:cursor-not-allowed shadow-lg"
              onClick={loadMoreBooks}
              disabled={loading || displayedBooks.length === books.length}
            >
              Load More
            </button>
          )}
        </div>
      )}
      <BookHistory handleClick={handleOnBookClick} />
    </div>
  );
};
export default Home;
