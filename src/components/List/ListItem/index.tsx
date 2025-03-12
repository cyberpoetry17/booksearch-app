import { useEffect, useState } from "react";
import BookOverview from "../../../types/BookOverview";
import { getLanguages } from "../utils";

type ListItemProps = {
  book: BookOverview;
  handleClick: (id: string, coverId?: number) => void;
};

const ListItem = ({ book, handleClick }: ListItemProps) => {
  const { key, cover_i, title, subtitle } = book;
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://covers.openlibrary.org/b/id/${cover_i}-S.jpg`
        );
        const blob = await response.blob();
        const imageUrls = URL.createObjectURL(blob);
        setImageUrl(imageUrls);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImage();
  }, [cover_i]);

  return (
    <li
      key={key}
      className="bg-white flex my-4 h-[100px] min-w-[200px] rounded-2xl shadow-lg cursor-pointer overflow-hidden "
      onClick={() => handleClick(key, cover_i)}
    >
      <div className="w-fit p-3.5 flex items-center justify-center flex-shrink-0">
        <img alt={title} width={40} height={60} src={imageUrl} />
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <span>{title}</span>
        <span>{getLanguages(book)}</span>
        <span>{subtitle}</span>
      </div>
    </li>
  );
};

export default ListItem;
