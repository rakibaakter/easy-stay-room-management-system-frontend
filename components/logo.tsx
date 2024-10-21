import { FaHome } from "react-icons/fa";
const Logo = () => {
  return (
    <div className="flex">
      <FaHome color="green" size={24} />
      <p className="font-semibold text-inherit text-xl">
        Easy<span className="">Stay</span>
      </p>
    </div>
  );
};

export default Logo;
