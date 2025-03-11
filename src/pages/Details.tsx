import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BookDetails from "../types/BookDetails";
import Card from "../components/Card";

const Details = () => {
  const { id, coverId } = useParams();

  const [bookDetails, setBookDetails] = useState<BookDetails>();
  const [imageUrl, setImageUrl] = useState("");

  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/works/${id}.json`
        );
        const data = await response.json();
        setBookDetails(data);
        setIsLoadingDetails(false);
      } catch (error) {
        console.log(error);
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
        const blob = await response.blob();
        const imageUrls = URL.createObjectURL(blob);
        setImageUrl(imageUrls);
        setIsLoadingImage(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImage();
  }, [coverId]);

  return (
    <div className="m-2 p-2 flex items-center justify-center">
      <Card
        url={imageUrl}
        title={bookDetails?.title}
        subtitle={bookDetails?.subtitle}
        isLoadingImage={isLoadingImage}
        isLoadingDetails={isLoadingDetails}
      />
    </div>
  );
};
export default Details;
