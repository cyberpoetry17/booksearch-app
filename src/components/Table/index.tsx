import { useState } from "react";
import BookOverview from "../../types/BookOverview";

interface TableProps {
  elements: BookOverview[];
  totalRows?: number;
  handleRowClick?: (id: string, coverId: number) => void;
}

const Table = ({ elements, handleRowClick }: TableProps) => {
  const [page, setPage] = useState(1);
  const maxRowsPerPage = 5;

  const currentRows = elements.slice(
    (page - 1) * maxRowsPerPage,
    page * maxRowsPerPage
  );

  const getKey = (key: string) => key.split("/")[2];
  return (
    <div>
      <table className="w-full table-auto border-separate border-spacing-4">
        <tbody>
          {currentRows?.map((element) => (
            <tr
              key={element.key}
              className="border border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                handleRowClick?.(getKey(element.key), 1);
              }}
            >
              <td></td>
              <td>{element.title}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
