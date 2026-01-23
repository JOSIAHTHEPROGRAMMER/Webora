import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { UserButton } from "@daveyplate/better-auth-ui";
import api from "@/configs/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Background from "./Background";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [credits, setCredits] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session } = authClient.useSession();

  const getCredits = async () => {
    try {
      const { data } = await api.get("/api/user/credits");
      setCredits(data.credits);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getCredits();
    }
  }, [session?.user]);

  // Nav links configuration
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "My Projects" },
    { to: "/community", label: "Community" },
    { to: "/pricing", label: "Pricing" },
  ];

  // Check if link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Background Gradient Glow On top of the navbar */}
      <Background />

      {/* Desktop Navbar - Rounded Pill Style */}
      <nav className="z-50 flex items-center justify-center w-full py-4 px-4">
        <div
          className="flex items-center justify-between w-full max-w-4xl border
         border-slate-700 rounded-full px-4 py-2.5 text-white backdrop-blur-md bg-black/20"
        >
          {/* Logo */}
          <Link to="/">
            <img src={assets.logo} alt="logo" className="h-5 sm:h-7" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                  isActive(link.to)
                    ? "border-white/10 bg-white/10 font-medium"
                    : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {!session?.user ? (
              <button
                className="px-5 py-1.5 text-sm bg-teal-600 active:scale-95 hover:bg-teal-700 transition rounded-full"
                onClick={() => navigate("/auth/signin")}
              >
                Get started
              </button>
            ) : (
              <>
                <button
                  className="bg-white/10 px-5 py-1.5 text-xs sm:text-sm border
                 text-gray-200 active:scale-95 hover:bg-white/20 transition rounded-full"
                >
                  Credits :<span className="text-sky-300 pl-1">{credits}</span>
                </button>
                <UserButton size="icon" />
              </>
            )}

            <button
              className="md:hidden active:scale-90 transition"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-100 bg-black/80 text-white backdrop-blur-sm flex 
        flex-col items-center justify-center text-lg gap-8 md:hidden"
        >
          {/* Mobile Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`px-6 py-3 rounded-full transition ${
                isActive(link.to)
                  ? "border border-white/10 bg-white/10 font-medium"
                  : "hover:border hover:border-white/10 hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Close Button */}
          <button
            className="mt-4 bg-gray-800 hover:bg-black text-white p-2 rounded-md
             aspect-square font-medium active:scale-90 transition"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
