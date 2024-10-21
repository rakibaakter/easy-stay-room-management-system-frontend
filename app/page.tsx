import Image from "next/image";

import RoomSection from "@/components/root/roomSection";
import homeBanner from "@/public/assets/homepage_banner.jpg";
const Root = () => {
  return (
    <div className=" space-y-16">
      <Image
        alt="stay easy banner"
        className="h-[260px] md:h-[540px] w-full"
        src={homeBanner}
      />
      <RoomSection />
    </div>
  );
};

export default Root;
