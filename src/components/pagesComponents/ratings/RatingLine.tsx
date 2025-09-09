import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingsLine = ({
  ratingsNumber,
  ratingTotal,
}: {
  ratingsNumber: number;
  ratingTotal?: number;
}) => {
  const fullStars = Math.floor(ratingsNumber);
  const hasHalfStar = ratingsNumber - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        {[...Array(fullStars)]?.map((_, i) => (
          <FaStar key={`full-${i}`} className="text-xl text-[#A46BFF]" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-xl text-[#A46BFF]" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-xl text-gray-300" />
        ))}
      </div>
      <div className="flex items-center gap-1">
        <span>{ratingTotal}</span>
      </div>
    </>
  );
};

export default RatingsLine;
