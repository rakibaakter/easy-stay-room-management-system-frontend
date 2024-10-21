import { FaHome } from "react-icons/fa";
const Logo = () => {
    return (
        <div className="flex">
            <FaHome size={24} color="green"/>
            <p className="font-semibold text-inherit text-xl">Easy<span className="">Stay</span></p>
        </div>
    );
};

export default Logo;