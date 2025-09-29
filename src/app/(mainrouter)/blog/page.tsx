import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Blog| ${process.env.NEXT_PUBLIC_APP_NAME}`,
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
