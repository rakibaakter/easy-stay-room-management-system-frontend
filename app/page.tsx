import RoomSection from "@/components/root/roomSection";
import homeBanner from "@/public/assets/homepage_banner.jpg"
import Image from "next/image";
const Root = () => {
  return (
    <div className=" space-y-16">
      <Image src={homeBanner} alt="stay easy banner" className="h-[540px] w-full" />
      <RoomSection />
    </div>
  );
};

export default Root;

