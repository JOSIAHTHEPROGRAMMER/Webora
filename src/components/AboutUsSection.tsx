import { features } from "../assets/assets";
import Background from "./Background";

const AboutUsSection = () => {
  return (
    <>
      <div className="relative py-20 px-4 md:px-16 lg:px-24 xl:px-40">
        <Background />

        <h1 className="relative text-3xl md:text-4xl font-semibold text-center mb-4 text-white">
          About Webora
        </h1>

        <div className="w-24 h-1 bg-linear-to-r from-[#67E8F9] to-[#38BDF8] mx-auto rounded-full mb-6"></div>

        <p className="text-sm md:text-base text-slate-400 text-center mt-2 max-w-xl mx-auto">
          Webora is an AI-powered website builder that transforms ideas into
          fully functional, beautiful websites in seconds. We combine
          intelligent design, automated content generation, and instant
          deployment to help creators, founders, and businesses launch faster
          than ever.
        </p>

        <div className="relative max-w-6xl mx-auto text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 pt-16">
          {features.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 transition relative z-10
        bg-white/5 backdrop-blur-md border border-white/10
        hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(56,189,248,0.15)]"
            >
              <div
                className={`p-4 rounded-lg bg-linear-to-tr ${item.color} inline-block`}
              >
                <img src={item.img} alt="" className="w-12 h-12" />
              </div>

              <div className="mt-5 space-y-2">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUsSection;
