import { cn } from "@/lib/utils";

const MainContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("max-w-[1280px] w-full mx-auto", className)}>
      {children}
    </div>
  );
};
export default MainContainer;
