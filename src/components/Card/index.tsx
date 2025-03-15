import { BookDetails } from "../../types";
import BookDetailsLoader from "../Loaders/BookDetails";
import NoData from "../NoData";

type CardProps = {
  book?: BookDetails;
  authors?: string[];
  isLoadingDetails?: boolean;
  errorFetching?: boolean;
};

const SOMETHING_WENT_WRONG_TEXT =
  "Ooops! Something went wrong with fetching your book.";

const Card = ({
  book,
  authors,
  isLoadingDetails = false,
  errorFetching = false,
}: CardProps) => (
  <div
    className={`p-7 gap-1.5 flex flex-col overflow-auto max-h-fit w-full rounded-lg shadow-2xl z-10 ${
      isLoadingDetails ? "animate-puls bg-neutral-200" : "bg-gray-50"
    }`}
  >
    {!errorFetching && book ? (
      <>
        {book.title && (
          <p className="font-bold text-[#0055ff6b] text-3xl">{book.title}</p>
        )}
        {authors?.length && (
          <p className="font-bold text-[#0055ff6b] text-3xl font-serif p-2 ">
            Authors: {authors.join(",")}
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
          <p className="font-bold font-serif">Revision: {book.revision}</p>
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
      <NoData text={SOMETHING_WENT_WRONG_TEXT} />
    ) : (
      <BookDetailsLoader />
    )}
  </div>
);

export default Card;
