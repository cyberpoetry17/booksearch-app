import { useEffect, useState } from "react";
import { BookOverview, ViewedBook } from "../../../types/";
import { getLanguages } from "../utils";
import ImageLoader from "../../Loaders/Image";
import TextLoader from "../../Loaders/TextLoader";
import { COVER_URL_BASE } from "../../../constants";

type ListItemProps = {
  book: BookOverview;
  handleClick: (viewedBook: ViewedBook) => void;
};

const ListItem = ({ book, handleClick }: ListItemProps) => {
  const { key, cover_i, title, author_name } = book;
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${COVER_URL_BASE}${cover_i}-S.jpg`);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const blob = await response.blob();
        const imageUrls = URL.createObjectURL(blob);
        setImageUrl(imageUrls);
      } catch (error) {
        console.error(`Book overview image fetching: ${error} `);
      }
    };

    fetchImage();
  }, [cover_i]);

  return (
    <li
      key={key}
      className="bg-white flex my-4 min-h-[100px] h-fit min-w-[200px] rounded-2xl shadow-lg cursor-pointer overflow-hidden "
      onClick={() =>
        handleClick({
          key: key,
          imageUrl: imageUrl ?? "",
          title: title,
          coverId: cover_i?.toString() ?? "",
        })
      }
    >
      <div className="w-fit p-3.5 flex items-center justify-center flex-shrink-0">
        {imageUrl ? (
          <img alt={title} width={40} height={60} src={imageUrl} />
        ) : (
          <ImageLoader />
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        {title ? (
          <span className="font-semibold">{title}</span>
        ) : (
          <TextLoader />
        )}
        {author_name ? (
          <span className="font-medium">{author_name}</span>
        ) : (
          <TextLoader />
        )}
        {book.language ? (
          <span className="font-light">{getLanguages(book)}</span>
        ) : (
          <TextLoader />
        )}
      </div>
    </li>
  );
};

export default ListItem;
