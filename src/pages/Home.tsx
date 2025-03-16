import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { BookOverview, ViewedBook } from "../types";
import { useBooks } from "../hooks/useBooks";
import { getKey } from "../components/List/utils";
import BookHistory from "../components/BookHistory";
import SpinningLoader from "../components/Loaders/LoadingScreen";
import List from "../components/List";
import Toolbar from "../components/Toolbar";
import Button from "../components/Button";
import { URL_BASE } from "../constants";

const BOOKS_PER_PAGE = 7;
const LOAD_MORE_TEXT = "Load more";

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

  const [isLoading, setIsLoading] = useState(false);
  const [errorNoData, setErrorNoData] = useState(false);

  const [errorFetching, setErrorFetching] = useState(false);

  const navigate = useNavigate();

  const fetchBooks = useCallback(
    async (searchTerm: string) => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${URL_BASE}search.json?q=${searchTerm.trim()}`
        );
        if (!response.ok) {
          setErrorFetching(true);
          throw new Error("Something went wrong!");
        }

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
        console.error("Book overview fetching: ", error);
      } finally {
        setIsLoading(false);
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

  const onSearchButtonClick = () => {
    setPage(1);
    fetchBooks(searchTerm);
  };

  return (
    <div className="bg-[#EAF0F5] grid grid-rows-[auto_1fr_auto] overflow-hidden gap-2 pb-2 h-screen">
      <Toolbar
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}
        onSearchButtonClick={onSearchButtonClick}
      />
      {displayedBooks && (
        <List
          isLoading={isLoading}
          books={displayedBooks}
          handleClick={handleOnBookClick}
          errorNoData={errorNoData}
          errorFetching={errorFetching}
        />
      )}
      {displayedBooks.length > 0 && displayedBooks.length <= books.length && (
        <div className="flex justify-center items-center">
          {isLoading ? (
            <SpinningLoader />
          ) : (
            <Button
              onClick={loadMoreBooks}
              variant="load"
              disabled={isLoading || displayedBooks.length === books.length}
            >
              {LOAD_MORE_TEXT}
            </Button>
          )}
        </div>
      )}
      <BookHistory handleClick={handleOnBookClick} />
    </div>
  );
};
export default Home;
