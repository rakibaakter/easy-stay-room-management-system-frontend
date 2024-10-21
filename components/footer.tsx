import Logo from "./logo";

const Footer = () => {
  return (
    <div className="w-full  bg-green-950  text-white mt-16">
      <div className="py-8 container max-w-7xl mx-auto md:flex justify-between ">
        <h2 className="">
          Copyright @ 2024 Easy Stay, All rights reserved. Developed By Rakiba
          Akter
        </h2>
        <div>
        <Logo/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
