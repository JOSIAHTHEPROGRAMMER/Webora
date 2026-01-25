import type { Testimonial } from "@/types";
import { StarIcon } from "lucide-react";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div
      className="group w-95 mx-3 space-y-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-white/80 hover:bg-white/10 hover:border-sky-400/30 hover:shadow-lg 
    hover:shadow-teal-400/10 transition-all duration-300"
    >
      {/* Rating & Date */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[...Array(item.rating)].map((_, index) => (
            <StarIcon
              key={index}
              className="size-4 fill-teal-400 text-teal-400 transition-transform group-hover:scale-110"
              style={{ transitionDelay: `${index * 50}ms` }}
            />
          ))}
        </div>
        <p className="text-white/40 text-xs font-medium">{item.date}</p>
      </div>

      {/* Review */}
      <p className="text-white/70 text-sm leading-relaxed line-clamp-4 group-hover:text-white/90 transition-colors">
        "{item.review}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <div className="relative">
          <img
            className="size-10 rounded-full ring-2 ring-teal-400/30 object-cover transition-all group-hover:ring-blue-400/50"
            width={40}
            height={40}
            src={item.image}
            alt={item.name}
            loading="lazy"
          />
          <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-blue-400 rounded-full border-2 border-[#0a0b1e]" />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-white text-sm group-hover:text-teal-400 transition-colors">
            {item.name}
          </p>
          <p className="text-white/40 text-xs">Verified User</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
