import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BookDetails } from "../types/";
import Card from "../components/Card";
import { useBooks } from "../hooks/useBooks";

const Details = () => {
  const { id, coverId } = useParams();

  const { authors } = useBooks();

  const [bookDetails, setBookDetails] = useState<BookDetails>();
  const [imageUrl, setImageUrl] = useState<string>("");

  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  const [errorFetching, setErrorFetching] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/works/${id}.json`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
          setErrorFetching(true);
        }
        const data = await response.json();
        setBookDetails(data);
        setIsLoadingDetails(false);
      } catch (error) {
        console.error("Book details fetching: ", error);
        setErrorFetching(true);
      } finally {
        setIsLoadingDetails(false);
      }
    };

    fetchDetails();
  }, [id]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const blob = await response.blob();
        const imageUrls = URL.createObjectURL(blob);
        setImageUrl(imageUrls);
      } catch (error) {
        console.error("Book details image fetching: ", error);
      } finally {
        setIsLoadingImage(false);
      }
    };

    fetchImage();
  }, [coverId]);

  return (
    <div
      className={`p-[10px] overflow-hidden  grid gap-2 grid-cols-[auto_1fr] relative ${
        !imageUrl.length && "animate-pulse bg-gray-400"
      }`}
    >
      <Card
        url={imageUrl}
        book={bookDetails}
        authors={authors}
        isLoadingImage={isLoadingImage}
        isLoadingDetails={isLoadingDetails}
        errorFetching={errorFetching}
      />

      {imageUrl.length && (
        <img
          src={imageUrl}
          className="absolute inset-0 w-full h-full object-cover blur-md z-0"
        />
      )}
    </div>
  );
};
export default Details;
