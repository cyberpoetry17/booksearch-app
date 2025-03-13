import { createContext, ReactNode, useState } from "react";
import { BookOverview, ViewedBook } from "../types/";

interface BookContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  books: BookOverview[];
  setBooks: (results: BookOverview[]) => void;

  displayedBooks: BookOverview[];
  setDisplayedBooks: (
    books: BookOverview[] | ((prevBooks: BookOverview[]) => BookOverview[])
  ) => void;

  viewedBooks: ViewedBook[];
  setViewedBooks: (
    books: ViewedBook[] | ((prevBooks: ViewedBook[]) => ViewedBook[])
  ) => void;

  page: number;
  setPage: (page: number | ((prevPage: number) => number)) => void;
}

export const BookContext = createContext<BookContextType | undefined>(
  undefined
);

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [books, setBooks] = useState<BookOverview[]>([]);
  const [viewedBooks, setViewedBooks] = useState<ViewedBook[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<BookOverview[]>([]);
  const [page, setPage] = useState(1);

  return (
    <BookContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        books,
        setBooks,
        viewedBooks,
        setViewedBooks,
        displayedBooks,
        setDisplayedBooks,
        page,
        setPage,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
