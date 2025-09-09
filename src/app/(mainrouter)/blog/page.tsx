import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GMPAPA | Blog",
  description: "the most trusted shop",
};

const BlogPage = () => {
  return (
    <>
      <p className="text-center text-gray-300 mt-10">No blog data found</p>
    </>
  );
};

export default BlogPage;
