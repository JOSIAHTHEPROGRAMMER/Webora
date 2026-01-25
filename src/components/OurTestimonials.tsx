import { testimonials } from "@/assets/assets";
import Marquee from "react-fast-marquee";
import TestimonialCard from "./TestimonialCard";

export default function OurTestimonials() {
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section className="flex flex-col items-center justify-between max-w-7xl mx-auto mt-32 max-sm:mt-20 px-4 mb-32">
      {/* Section Header */}
      <div className="flex flex-col items-center space-y-4 mb-12">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-400/40 border border-sky-400/40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
          </span>
          <p className="text-teal-400 font-medium text-xs tracking-wide uppercase">
            Testimonials
          </p>
        </span>

        <h3 className="text-4xl md:text-5xl font-bold text-white text-center">
          Loved by{" "}
          <span className="bg-linear-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">
            Creators
          </span>
        </h3>

        <p className="mt-2 text-base text-white/60 max-w-2xl text-center">
          Join thousands of entrepreneurs, freelancers, and businesses who trust
          Webora to bring their website ideas to life instantly.
        </p>
      </div>

      {/* Marquee Rows */}
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-[#0a0b1e] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[#0a0b1e] to-transparent z-10 pointer-events-none" />

        <Marquee pauseOnHover className="mb-4" gradient={false} speed={30}>
          {firstRow.map((item, index) => (
            <TestimonialCard key={`first-${index}`} item={item} />
          ))}
        </Marquee>

        <Marquee pauseOnHover direction="right" gradient={false} speed={30}>
          {secondRow.map((item, index) => (
            <TestimonialCard key={`second-${index}`} item={item} />
          ))}
        </Marquee>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-white/50 text-sm">
          Join <span className="text-sky-300 font-semibold">1,000+</span> happy
          users
        </p>
      </div>
    </section>
  );
}
