import NoData from "../../assets/icons/NoData";
import { BookDetails } from "../../types";
import BookDetailsLoader from "../Loaders/BookDetails";
import ImageLoader from "../Loaders/Image";

type CardProps = {
  url?: string;
  book?: BookDetails;
  authors?: string[];
  isLoadingImage?: boolean;
  isLoadingDetails?: boolean;
  errorFetching?: boolean;
};
const Card = ({
  url,
  book,
  isLoadingImage,
  authors,
  isLoadingDetails = false,
  errorFetching = false,
}: CardProps) => {
  return (
    <>
      {isLoadingImage ? (
        <ImageLoader type="large" />
      ) : (
        url && (
          <img
            src={url}
            alt="img"
            className="rounded-lg shadow-2xl md:h-[600px] md:w-[400px] w-[100px] h-[150px] z-10"
          />
        )
      )}

      <div className="p-7 gap-1.5 flex flex-col overflow-auto max-h-fit bg-gray-50 rounded-lg shadow-2xl z-10">
        {!errorFetching && book ? (
          <>
            {book.title && (
              <p className="font-bold text-[#0055ff6b] text-3xl">
                {book.title}
              </p>
            )}
            {authors?.length && (
              <p className="font-bold text-[#0055ff6b] text-3xl font-serif p-2 ">
                Authors: {authors.join(", ")}
              </p>
            )}
            {book.subtitle && (
              <p className="font-bold font-serif ">{book.subtitle}</p>
            )}
            {book.created?.value && (
              <p className="font-bold font-serif ">{book.created.value}</p>
            )}
            {book.first_publish_date && (
              <p className="font-bold font-serif ">
                First publish date: {book.first_publish_date}
              </p>
            )}
            {book.revision && (
              <p className="font-bold font-serif ">Revision: {book.revision}</p>
            )}
            {book.latest_revision && (
              <p className="font-bold font-serif ">
                Latest revision: {book.latest_revision}
              </p>
            )}
            {book.description ? (
              typeof book.description === "string" ? (
                <p className="font-bold font-serif">{book.description}</p>
              ) : (
                <p className="font-bold font-serif">{book.description.value}</p>
              )
            ) : null}
          </>
        ) : !isLoadingDetails ? (
          <div className=" flex flex-col justify-center items-center font-bold  text-neutral-400 ">
            <NoData className="w-[100px] h-[100px] self-center" />
            Ooops! Something went wrong with fetching your book.
          </div>
        ) : (
          <BookDetailsLoader />
        )}
      </div>
    </>
  );
};

export default Card;
