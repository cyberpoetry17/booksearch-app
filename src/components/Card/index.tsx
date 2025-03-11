type CardProps = {
  url: string;
  title?: string;
  subtitle?: string;
  isLoadingImage?: boolean;
  isLoadingDetails?: boolean;
};
const Card = ({
  url,
  title,
  subtitle,
  isLoadingImage,
  isLoadingDetails,
}: CardProps) => {
  return (
    <div className="border border-[#698a7e] hover:border-[#40534C] rounded-lg flex">
      {isLoadingImage ? (
        <div className="w-[320px] h-[500px] bg-gray-300 animate-pulse rounded-lg" />
      ) : (
        url && (
          <img src={url} alt="img" className="w-[320px] h-[500px] rounded-lg" />
        )
      )}
      <div className="p-2">
        <table>
          <tbody>
            {!isLoadingDetails ? (
              <>
                <tr>
                  <td className="">Title</td>
                  <td>{title}</td>
                </tr>
                <tr>
                  <td>Subtitle</td>
                  <td>{subtitle}</td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td className="w-24 bg-gray-300 animate-pulse h-4 rounded"></td>
                  <td className="w-32 bg-gray-300 animate-pulse h-4 rounded"></td>
                </tr>
                <tr>
                  <td className="w-24 bg-gray-300 animate-pulse h-4 rounded"></td>
                  <td className="w-32 bg-gray-300 animate-pulse h-4 rounded"></td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Card;
