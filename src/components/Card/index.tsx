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
          <p className="font-bold text-neutral-600 text-3xl">{book.title}</p>
        )}
        {authors && (
          <p className="font-bold text-neutral-600 text-xl font-serif">
            Authors: {authors.join(", ")}
          </p>
        )}
        {book.subtitle && (
          <p className="font-bold font-serif text-neutral-600">
            {book.subtitle}
          </p>
        )}
        {book.created?.value && (
          <p className="font-bold font-serif text-neutral-600">
            Date created: {new Date(book.created.value).toLocaleDateString()}
          </p>
        )}
        {book.first_publish_date && (
          <p className="font-bold font-serif text-neutral-600">
            First publish date: {book.first_publish_date}
          </p>
        )}
        {book.revision && (
          <p className="font-bold font-serif text-neutral-600">
            Revision: {book.revision}
          </p>
        )}
        {book.latest_revision && (
          <p className="font-bold font-serif text-neutral-600">
            Latest revision: {book.latest_revision}
          </p>
        )}
        {book.description ? (
          typeof book.description === "string" ? (
            <p className="font-bold font-serif text-neutral-600">
              {book.description}
            </p>
          ) : (
            <p className="font-bold font-serif text-neutral-600">
              {book.description.value}
            </p>
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
