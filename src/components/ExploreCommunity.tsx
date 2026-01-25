import api from "@/configs/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ExternalLink, Calendar, User } from "lucide-react";

const ExploreCommunity = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const shuffleArray = (array: []) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/api/project/published");
      const randomProjects = shuffleArray(data.projects).slice(0, 4);
      setProjects(randomProjects);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load projects");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="px-4 md:px-16 lg:px-24 xl:px-32 pb-20">
        <div className="h-8 w-64 bg-gray-800 rounded-lg animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gray-900/60 border border-gray-700 rounded-lg overflow-hidden"
            >
              <div className="h-40 bg-gray-800 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse" />
                <div className="h-8 bg-gray-800 rounded animate-pulse mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!projects.length) {
    return null;
  }

  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32 pb-20">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white text-3xl font-bold mb-2">
            Explore Community{" "}
            <span className="bg-linear-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Creations
            </span>
          </h2>
          <p className="text-gray-400 text-sm">
            Discover amazing websites created by our community
          </p>
        </div>
        <Link
          to="/community"
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50  rounded-lg transition-all duration-300"
        >
          View All
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project: any) => (
          <Link
            key={project.id}
            to={`/view/${project.id}`}
            target="_blank"
            className="group cursor-pointer bg-gray-900/60 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all 
            duration-300"
          >
            {/* Mini Preview */}
            <div className="relative w-full h-48 bg-gray-900 overflow-hidden border-b border-gray-800">
              {project.current_code ? (
                <>
                  <iframe
                    srcDoc={project.current_code}
                    className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left pointer-events-none"
                    sandbox="allow-scripts allow-same-origin"
                    style={{ transform: "scale(0.25)" }}
                    title={project.name}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0  via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/50 rounded-lg px-4 py-2 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 " />
                      <span className=" text-sm font-medium">View Site</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 text-sm">No Preview Available</p>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Title & Badge */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-white text-base font-semibold line-clamp-1  transition-colors">
                  {project.name}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full whitespace-nowrap">
                  Live
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                {project.initial_prompt}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[11px]">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-2 px-2.5 py-1 bg-gray-800/50 rounded-full">
                  <div className="w-5 h-5 rounded-full bg-linear-to-br from-cyan-400 to-teal-400 flex items-center justify-center">
                    {project.user?.name?.[0]?.toUpperCase() ||
                    project.user?.fullName?.[0]?.toUpperCase() ? (
                      <span className="text-gray-900 font-bold text-[10px]">
                        {project.user?.name?.[0]?.toUpperCase() ||
                          project.user?.fullName?.[0]?.toUpperCase()}
                      </span>
                    ) : (
                      <User className="w-3 h-3 text-gray-900" />
                    )}
                  </div>
                  <span className="text-gray-300 text-[11px] font-medium max-w-20 truncate">
                    {project.user?.name ||
                      project.user?.fullName ||
                      "Anonymous"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile "View All" Button */}
      <Link
        to="/community"
        className="md:hidden flex items-center justify-center gap-2 px-6 py-3 mt-8 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400 rounded-lg transition-all duration-300 w-full"
      >
        View All Projects
        <ExternalLink className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default ExploreCommunity;
