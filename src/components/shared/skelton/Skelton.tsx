import MainContainer from "@/components/container/MainContainer";
import React from "react";
import Skeleton from "react-loading-skeleton";

interface CustomSkeletonProps {
  count?: number;
  width?: string;
  height?: number;
  color?: string;
  highlightColor?: string;
}

const CustomSkeleton: React.FC<CustomSkeletonProps> = ({
  count = 0,
  width = "",
  height = 0,
  color = "",
  highlightColor = ""
}) => {

  return (
    <MainContainer>
      <Skeleton
        count={count}
        height={height}
        width={`${width}`}
        baseColor={`${color}`}
        highlightColor={`${highlightColor}`}
      />
    </MainContainer>
  );
};

export default CustomSkeleton;
