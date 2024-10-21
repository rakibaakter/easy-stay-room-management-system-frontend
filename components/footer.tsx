import Logo from "./logo";

const Footer = () => {
  return (
    <div className="w-full  bg-green-950  text-white mt-16">
      <div className="py-8 container max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-4 items-center md:justify-between  px-6 ">
        <h2 className="text-xs md:text-sm text-center">
          Copyright @ 2024 Easy Stay, All rights reserved. Developed By Rakiba
          Akter
        </h2>
        <div>
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default Footer;
