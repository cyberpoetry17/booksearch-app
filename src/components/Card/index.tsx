import { BookDetails } from "../../types";

type CardProps = {
  url?: string;
  book: BookDetails;
  authors?: string[];
  isLoadingImage?: boolean;
  isLoadingDetails?: boolean;
};
const Card = ({ url, book, isLoadingImage, authors }: CardProps) => {
  return (
    <div className="rounded-lg flex w-full h-fit gap-14">
      {isLoadingImage ? (
        <div className="  bg-gray-300 animate-pulse md:h-[600px] rounded-lg shadow-2xl md:w-[400px] w-[120px] h-[150x]" />
      ) : (
        url && (
          <img
            src={url}
            alt="img"
            className="md:h-[600px] rounded-lg shadow-2xl md:w-[400px] w-[120px] h-[150x]"
          />
        )
      )}
      <div className="p-2 gap-1.5 flex flex-col">
        {book.title && (
          <p className="font-bold text-[#0055ff6b] text-3xl font-serif">
            {book.title}
          </p>
        )}
        {authors?.length && (
          <p className="font-bold text-[#0055ff6b] text-3xl font-serif p-2">
            Authors: {authors.join(", ")}
          </p>
        )}
        {book.subtitle && (
          <p className="font-bold font-serif">{book.subtitle}</p>
        )}
        {book.created?.value && (
          <p className="font-bold font-serif">{book.created.value}</p>
        )}
        {book.first_publish_date && (
          <p className="font-bold font-serif">{book.first_publish_date}</p>
        )}
        {book.revision && (
          <p className="font-bold font-serif">Revision: {book.revision}</p>
        )}
        {book.latest_revision && (
          <p className="font-bold font-serif">
            Latest revision: {book.latest_revision}
          </p>
        )}
        {book.description?.value && (
          <p className="font-bold font-serif">{book.description.value}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
