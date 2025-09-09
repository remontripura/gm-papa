import { BarLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <BarLoader color="#ffd500" height={4} width={250} />
    </div>
  );
};

export default Loading;
