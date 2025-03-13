import { useEffect, useState } from "react";
import { BookOverview, ViewedBook } from "../../../types/";
import { getLanguages } from "../utils";

type ListItemProps = {
  book: BookOverview;
  handleClick: (viewedBook: ViewedBook, coverId?: number) => void;
};

const ListItem = ({ book, handleClick }: ListItemProps) => {
  const { key, cover_i, title, author_name } = book;
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
      className="bg-white flex my-4 min-h-[100px] h-fit min-w-[200px] rounded-2xl shadow-lg cursor-pointer overflow-hidden "
      onClick={() =>
        handleClick(
          { key: key, imageUrl: imageUrl ?? "", title: title },
          cover_i
        )
      }
    >
      <div className="w-fit p-3.5 flex items-center justify-center flex-shrink-0">
        <img alt={title} width={40} height={60} src={imageUrl} />
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <span className="font-semibold">{title}</span>
        <span className="font-medium">{author_name}</span>
        <span className="font-light">{getLanguages(book)}</span>
      </div>
    </li>
  );
};

export default ListItem;
