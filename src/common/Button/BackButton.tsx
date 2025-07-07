import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to }: any) => {
  const navigate = useNavigate();

  return (
    <div>
      <p
        onClick={() => navigate(`${to}`)}
        className="border w-fit flex items-center justify-start gap-2 text-white cursor-pointer px-4 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all duration-300"
      >
        <FaArrowAltCircleLeft /> Back
      </p>
    </div>
  );
};

export default BackButton;
