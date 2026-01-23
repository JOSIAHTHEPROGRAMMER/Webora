import { Loader2Icon, PlusIcon, Search, TrashIcon } from "lucide-react";
import type { Project } from "../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/configs/axios";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const MyProjects = () => {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]); // Store all projects
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/api/user/projects");
      setProjects(data.projects);
      setAllProjects(data.projects); // Store original projects
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
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
        project.initial_prompt.toLowerCase().includes(searchTerm),
    );
    setProjects(filteredProjects);
  };

  const deleteProject = async (projectId: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this project?",
      );
      if (!confirm) return;
      const { data } = await api.delete(`/api/project/${projectId}`);
      toast.success(data.message);
      fetchProjects();
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!isPending && session?.user) {
      fetchProjects();
    } else if (!isPending && !session?.user) {
      navigate("/");
      toast.error("Please login to view your projects");
    }
  }, [session?.user]);

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
              <h1 className="text-2xl font-medium text-white">My Projects</h1>

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
                    placeholder="Search projects..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 text-white px-3 sm:px-6 py-2 rounded bg-linear-to-r
           from-teal-500 to-sky-600 hover:from-teal-600 hover:to-teal-700 hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
                >
                  <PlusIcon size={18} />
                  <span className="hidden sm:inline">Create New</span>
                  <span className="sm:hidden">New</span>
                </button>
              </div>
            </div>

            {projects.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {projects.map((project) => (
                  <div
                    onClick={() => navigate(`/projects/${project.id}`)}
                    key={project.id}
                    className="relative group w-72 max-sm:mx-auto cursor-pointer bg-gray-900/60 border border-gray-700 rounded-lg overflow-hidden shadow-md group hover:shadow-sky-700/30 hover:border-sky-800/80 transition-all duration-300"
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
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-between mt-6"
                      >
                        <span className="text-xs text-gray-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex text-white text-sm gap-3">
                          <button
                            onClick={() => navigate(`/preview/${project.id}`)}
                            className="px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-md transition-all"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => navigate(`/projects/${project.id}`)}
                            className="px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-md transition-colors"
                          >
                            Open
                          </button>
                        </div>
                      </div>
                    </div>

                    <div onClick={(e) => e.stopPropagation()}>
                      <TrashIcon
                        className="absolute top-3 right-3 scale-0 group-hover:scale-100 bg-white p-1.5 size-7 rounded cursor-pointer text-red-400 hover:text-red-700 text-xl transition-all"
                        onClick={() => deleteProject(project.id)}
                      />
                    </div>
                  </div>
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
              You have no projects yet !
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

export default MyProjects;
