import { Loader2Icon, PlusIcon, Search } from "lucide-react";
import type { Project } from "../types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/configs/axios";
import { toast } from "sonner";

const Community = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]); // Store all projects
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/api/project/published");
      setProjects(data.projects);
      setAllProjects(data.projects); // Store original projects
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) {
      setProjects(allProjects); // Reset to all projects if search is empty
      return;
    }

    const filteredProjects = allProjects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm) ||
        project.initial_prompt.toLowerCase().includes(searchTerm) ||
        project.user?.name?.toLowerCase().includes(searchTerm) ||
        project.user?.fullName?.toLowerCase().includes(searchTerm),
    );
    setProjects(filteredProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <div className="px-4 md:px-16 lg:px-24 xl:px-32">
        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Loader2Icon className="animate-spin size-7 text-sky-200" />
          </div>
        ) : projects.length > 0 || searchQuery ? (
          <div className="py-10 min-h-[80vh]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
              <h1 className="text-2xl font-medium text-white">
                Published Projects
              </h1>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by name, prompt, or author..."
                    className="w-full sm:w-80 pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {projects.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/view/${project.id}`}
                    target="_blank"
                    className="w-72 max-sm:mx-auto cursor-pointer bg-gray-900/60 border border-gray-700 rounded-lg overflow-hidden group hover:shadow-sky-700/30 hover:border-sky-800/80 transition-all duration-300"
                  >
                    {/* Desktop Like mini preview */}
                    <div className="relative w-full h-40 bg-gray-900 overflow-hidden border-b border-gray-800">
                      {project.current_code ? (
                        <iframe
                          srcDoc={project.current_code}
                          className="absolute top-0 left-0 w-300 h-200 origin-top-left pointer-events-none"
                          sandbox="allow-scripts allow-same-origin"
                          style={{
                            transform: "scale(0.25)",
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          <p className="text-gray-400">No Preview</p>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 text-white bg-linear-to-b from-transparent group-hover:from-sky-950/50 to-transparent transition-colors">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium line-clamp-2">
                          {project.name}
                        </h2>
                        <button className="px-2.5 py-0.5 mt-1 ml-2 text-xs bg-gray-800 border border-gray-700 rounded-full">
                          Website
                        </button>
                      </div>
                      <p className="text-gray-500 mt-1 text-sm line-clamp-2">
                        {project.initial_prompt}
                      </p>
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-xs text-gray-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex text-white text-sm gap-3">
                          <button className="px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-md transition-colors flex items-center gap-2">
                            <span className="bg-gray-200 size-4.5 rounded-full text-black font-semibold flex items-center justify-center">
                              {project.user?.name?.slice(0, 1) ||
                                project.user?.fullName?.slice(0, 1) ||
                                "U"}
                            </span>
                            {project.user?.name ||
                              project.user?.fullName ||
                              "Unknown"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-[50vh]">
                <h1 className="text-2xl font-semibold text-gray-300">
                  No projects found matching "{searchQuery}"
                </h1>
                <button
                  className="flex items-center px-5 py-2 mt-5 rounded-md text-white bg-linear-to-br from-sky-500 to-cyan-600 hover:opacity-90 active:scale-95 transition-all"
                  onClick={() => {
                    setSearchQuery("");
                    setProjects(allProjects);
                  }}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-[80vh]">
            <h1 className="text-3xl font-semibold text-gray-300">
              No published projects yet !
            </h1>
            <button
              className="flex items-center px-5 py-2 mt-5 rounded-md text-white bg-linear-to-br from-sky-500 to-cyan-600 hover:opacity-90 active:scale-95 transition-all"
              onClick={() => navigate("/")}
            >
              <PlusIcon size={18} />
              Create New
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Community;
