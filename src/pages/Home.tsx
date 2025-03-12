import { useEffect, useState } from "react";
import Search from "../components/Search";
import BookOverview from "../types/BookOverview";
import { useNavigate } from "react-router";
import List from "../components/List";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<BookOverview[]>();

  //
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const handleClick = (id: string, coverId?: string) => {
    console.log(id, coverId, "details");
    navigate(`/book/${id}/${coverId}`);
  };

  const limit = 5;
  const [page, setPage] = useState(1);
  //openlibrary.org/search.json?q=the+lord+of+the+rings&limit=25&page=2

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      fetch(
        `https://openlibrary.org/search.json?title=${searchTerm}&limit=${limit}&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (
            (data.docs as BookOverview[]).filter(
              (book) => book.cover_i !== null && book.cover_i !== undefined
            ).length < limit
          )
            setHasMore(false);

          setBooks(data.docs);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [page, searchTerm]);

  const filteredBooks = books?.filter(
    (book) => book.cover_i !== null && book.cover_i !== undefined
  );

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
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
      {filteredBooks && (
        <div className=" my-6 w-full h-fit overflow-auto">
          <List
            books={filteredBooks}
            isLoading={isLoading}
            handleLoadMore={handleLoadMore}
            page={page}
            handlePage={(page: number) => setPage(page)}
            handleClick={handleClick}
          />
        </div>
      )}
    </div>
  );
};
export default Home;
