import { cn } from "@/lib/utils";

const ReviewLine = ({
  rate,
  number,
  people,
}: {
  rate: number;
  number: number;
  people: string;
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="h-2 rounded-md md:w-[500px] w-[150px] bg-slate-50">
        <div
          className={cn(`h-full bg-[#A46BFF] rounded-md`)}
          style={{ width: `${rate}%` }}
        />
      </div>
      <p className="flex items-center gap-7">
        <span>{number}</span>
        <span>{people} Reviews</span>
      </p>
    </div>
  );
};

export default ReviewLine;
