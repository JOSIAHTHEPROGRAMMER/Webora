import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const handlePublicRoute = () => {
    scrollTo(0, 0);
  };

  return (
    <footer className="px-4 mt-50 md:px-16 lg:px-24 xl:px-40 pt-8 w-full text-slate-300 bg-transparent backdrop-blur-sm">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-white/10 pb-6">
        <div className="md:max-w-96">
          <div className="flex items-center ml-10 gap-2 mb-6">
            <Link to="/">
              <img
                src={assets.logo}
                alt="Logo"
                className="h-10 scale-200 cursor-pointer brightness-110"
                onClick={handlePublicRoute}
              />
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-400 leading-relaxed">
            A modern platform for creating and launching websites with ease.
            Design, customize, and publish faster using intelligent tools built
            to turn ideas into real products.
          </p>
        </div>

        <div className="flex-1 flex items-start md:justify-evenly gap-12 md:gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-sky-300">Product</h2>
            <ul className="text-sm space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/aboutus", label: "About" },
                { to: "/contact", label: "Contact" },
                { to: "/privacypolicy", label: "Privacy" },
                { to: "/careers", label: "Careers" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={handlePublicRoute}
                    className="text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-5 text-sky-300">Contact</h2>
            <div className="text-sm space-y-2 text-slate-400">
              <p>+1 868 555 0123</p>
              <p className="hover:text-cyan-300 transition-colors cursor-pointer">
                support@webora.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-4 text-center text-xs md:text-sm pb-5 text-slate-500">
        © 2026 Webora. All rights reserved. support@webora.com
      </p>
    </footer>
  );
};

export default Footer;
