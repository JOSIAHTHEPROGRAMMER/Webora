import { features } from "../assets/assets";
import Background from "./Background";

const AboutUsSection = () => {
  // Split features into rows of 2 for alternating layout
  const rows: (typeof features)[] = [];
  for (let i = 0; i < features.length; i += 2) {
    rows.push(features.slice(i, i + 2));
  }

  return (
    <div className="relative py-28 px-4 md:px-16 lg:px-24 xl:px-40 overflow-hidden">
      {/*  Section label  */}
      <div className="relative flex items-center justify-center gap-3 mb-8">
        <div className="h-px w-10 bg-cyan-400/50" />
        <span className="text-[11px] font-semibold tracking-[0.25em] text-cyan-400 uppercase">
          Our Platform
        </span>
        <div className="h-px w-10 bg-cyan-400/50" />
      </div>

      {/*  Heading  */}
      <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-light text-center text-white tracking-tight mb-6 leading-[1.1]">
        Built for the way
        <br />
        <span className="font-semibold italic text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-sky-400">
          you create.
        </span>
      </h1>

      {/*  Divider  */}
      <div className="w-12 h-px bg-white/20 mx-auto mb-8" />

      {/*  Description  */}
      <p className="text-sm md:text-[15px] text-slate-400 text-center leading-relaxed max-w-lg mx-auto font-light">
        Webora transforms ideas into fully functional, beautiful websites in
        seconds combining intelligent design, automated content generation, and
        instant deployment.
      </p>

      {/*  Feature rows (alternating)  */}
      <div className="relative max-w-5xl mx-auto mt-24 flex flex-col gap-6">
        {rows.map((row, rowIdx) => {
          const isEven = rowIdx % 2 === 0;
          return (
            <div
              key={rowIdx}
              className={`grid gap-6 ${
                row.length === 2
                  ? isEven
                    ? "grid-cols-1 md:grid-cols-[2fr_1.1fr]"
                    : "grid-cols-1 md:grid-cols-[1.1fr_2fr]"
                  : "grid-cols-1 md:grid-cols-[2fr_1.1fr]"
              }`}
            >
              {row.map((item, cardIdx) => {
                // The wide card (index 0 on even rows, index 1 on odd rows)
                const isWide = isEven ? cardIdx === 0 : cardIdx === 1;
                return (
                  <div
                    key={cardIdx}
                    className={`
                      group relative rounded-2xl border border-white/8
                      bg-white/3 backdrop-blur-sm
                      transition-all duration-500
                      hover:border-white/15 hover:bg-white/5.5
                      ${isWide ? "p-10" : "p-8"}
                    `}
                  >
                    {/* Subtle top-left accent line */}
                    <div className="absolute top-0 left-8 w-12 h-px bg-linear-to-r from-cyan-400/60 to-transparent transition-all duration-500 group-hover:w-20 group-hover:from-cyan-300/80" />

                    {/* Icon */}
                    <div
                      className={`
                        inline-flex items-center justify-center rounded-xl
                        bg-linear-to-tr ${item.color}
                        mb-6 transition-transform duration-300 group-hover:scale-105
                        ${isWide ? "p-3.5" : "p-3"}
                      `}
                    >
                      <img
                        src={item.img}
                        alt=""
                        className={isWide ? "w-10 h-10" : "w-8 h-8"}
                      />
                    </div>

                    {/* Row number */}
                    <div className="absolute top-8 right-8 text-[11px] font-mono text-white/15 tracking-widest">
                      {String(rowIdx * 2 + cardIdx + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3
                        className={`font-semibold text-white leading-snug ${
                          isWide ? "text-xl" : "text-base"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-slate-400 leading-relaxed font-light ${
                          isWide ? "text-sm max-w-sm" : "text-xs"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom arrow  wide cards only */}
                    {isWide && (
                      <div className="mt-8 flex items-center gap-2 text-xs text-cyan-400/50 group-hover:text-cyan-400 transition-colors duration-300">
                        <span className="tracking-widest uppercase font-medium text-[10px]">
                          Learn more
                        </span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Lone last card (if odd total) centered */}
        {features.length % 2 !== 0 && (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr]">
            <div />
            <div className="group relative rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-10 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.055]">
              <div className="absolute top-0 left-8 w-12 h-px bg-gradient-to-r from-cyan-400/60 to-transparent transition-all duration-500 group-hover:w-20" />
              <div
                className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-tr ${features[features.length - 1].color} p-3.5 mb-6`}
              >
                <img
                  src={features[features.length - 1].img}
                  alt=""
                  className="w-10 h-10"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">
                  {features[features.length - 1].title}
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {features[features.length - 1].desc}
                </p>
              </div>
            </div>
            <div />
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUsSection;
