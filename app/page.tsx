import homeBanner from "@/public/assets/homepage_banner.jpg"
import Image from "next/image";
const Root = () => {
  return (
    <div>
      <div className="">
        {/* <img src="/assets/homepage_banner.jpg" alt="stay easy banner" className="h-[540px] w-full" /> */} 
        <Image src={homeBanner} alt="stay easy banner" className="h-[540px] w-full" />
      </div>
      <h2>Hello Homeeee!</h2>
    </div>
  );
};

export default Root;

