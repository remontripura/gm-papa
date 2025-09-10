import { Star } from "lucide-react";

interface RatingProps {
  rating: number; // example: 4.5
}

const StarRating = ({ rating }: RatingProps) => {
  return (
    <div className="flex text-[#A46BFF]">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;

        if (starValue <= Math.floor(rating)) {
          // full star
          return <Star key={i} size={18} className="fill-[#A46BFF]" />;
        }

        if (
          starValue === Math.ceil(rating) &&
          rating % 1 !== 0 // fractional rating
        ) {
          // half star
          return (
            <div key={i} className="relative w-[18px] h-[18px]">
              {/* Empty star */}
              <Star size={18} className="fill-none text-[#d6d6d6]" />
              {/* Half overlay */}
              <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                <Star size={18} className="fill-[#A46BFF]" />
              </div>
            </div>
          );
        }

        // empty star
        return <Star key={i} size={18} className="fill-none text-[#fdfdfd]" />;
      })}
    </div>
  );
};

export default StarRating;
