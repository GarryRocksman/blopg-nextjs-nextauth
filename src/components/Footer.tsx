import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-gray-400 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
            <span>Created by Ihor Bondarenko</span>
          </div>
          <div className="w-full md:w-auto text-center md:text-left">
            <Link href="https://github.com/GarryRocksman">Full Stack Developer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
