import { useEffect, useState } from "react";
import Search from "../components/Search";
import BookOverview from "../types/BookOverview";
import Table from "../components/Table";
import { useNavigate } from "react-router";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<BookOverview[]>();
  const [totalRows, setTotalRows] = useState(0);

  const navigate = useNavigate();

  const handleRowClick = (id: string, coverId: number) => {
    console.log(id, coverId, "details");
    navigate(`/book/${id}/${coverId}`);
  };

  useEffect(() => {
    if (searchTerm) {
      fetch(`https://openlibrary.org/search.json?title=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          setBooks(data.docs);
          setTotalRows(data.docs.length);
        })
        .catch((error) => console.log(error));
    }
  }, [searchTerm]);

  return (
    <div className="p-[10px]">
      <div>
        <Search
          searchTerm={searchTerm}
          handleSearch={(term) => setSearchTerm(term)}
          placeholder="Search by Title"
        />
      </div>
      {books && (
        <Table
          elements={books.filter((book) => book.coverI !== null)}
          handleRowClick={handleRowClick}
          totalRows={totalRows}
        />
      )}
    </div>
  );
};
export default Home;
