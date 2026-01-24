import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
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

      setLoading(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
      setLoading(false);
    }
  };
  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(input);

    try {
      if (!session?.user) {
        return toast.error("You must be logged in to create a website");
      } else if (!input.trim()) {
        return toast.error("Please enter a message");
      }
      setLoading(true);
      const { data } = await api.post("/api/user/project", {
        initial_prompt: input,
      });
      setLoading(false);
      if (!data.projectId) {
        toast.error("Failed to get project ID");
        return;
      }
      toast.success("Project created! Generating your website...");
      navigate(`/projects/${data.projectId}`);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <section className="flex flex-col items-center text-white text-sm pb-20 px-4 font-poppins">
        <a
          href="#"
          className="flex items-center gap-2 border border-slate-700 rounded-full p-1 pr-3 text-sm mt-20"
        >
          <span className="bg-sky-600 text-xs px-3 py-1 rounded-full">NEW</span>
          <p className="flex items-center gap-2">
            <span>Try 30 days free trial option</span>
            <svg
              className="mt-px"
              width="6"
              height="9"
              viewBox="0 0 6 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m1 1 4 3.5L1 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </a>

        <h1 className="text-center text-[40px] leading-12 md:text-6xl md:leading-17.5 mt-4 font-semibold max-w-3xl">
          Turn your thoughts into websites instantly, with AI.
        </h1>

        <p className="text-center text-base max-w-md mt-2">
          Create, customize and publish websites faster than ever with our
          intelligent website AI.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="bg-white/10 max-w-2xl w-full rounded-xl p-4 mt-10 border border-sky-600/70 focus-within:ring-2 ring-sky-500 transition-all"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                input.trim() &&
                !loading
              ) {
                e.preventDefault();
                onSubmitHandler(e as unknown as React.FormEvent);
              }
            }}
            className="bg-transparent outline-none text-gray-300 resize-none w-full"
            rows={4}
            placeholder="Describe your presentation in details"
            required
          />
          <button
            className="ml-auto flex items-center gap-2 bg-linear-to-r
           from-teal-500 to-sky-600 hover:from-teal-600 hover:to-teal-700 rounded-md px-4 py-2"
          >
            {!loading ? (
              "Create with AI"
            ) : (
              <div className="flex items-center gap-2">
                Creating{" "}
                <Loader2Icon className="animate-spin size-4 text-white" />
              </div>
            )}
          </button>
        </form>
      </section>
      {projects.length > 0 && (
        <div className="px-4 md:px-16 lg:px-24 xl:px-32 pb-20">
          <h2 className="text-white text-2xl font-medium mb-6">
            Explore Community Websites
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.map((project: any) => (
              <Link
                key={project.id}
                to={`/view/${project.id}`}
                target="_blank"
                className="cursor-pointer bg-gray-900/60 border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-sky-700/30 hover:border-sky-800/80 transition-all duration-300"
              >
                {/* Mini Preview */}
                <div className="relative w-full h-40 bg-gray-900 overflow-hidden border-b border-gray-800">
                  {project.current_code ? (
                    <iframe
                      srcDoc={project.current_code}
                      className="absolute top-0 left-0 w-300 h-200 origin-top-left pointer-events-none"
                      sandbox="allow-scripts allow-same-origin"
                      style={{ transform: "scale(0.25)" }}
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
                        <span className="bg-gray-200 w-6 h-6 rounded-full text-black font-semibold flex items-center justify-center text-xs">
                          {project.user?.name?.[0] ||
                            project.user?.fullName?.[0] ||
                            "U"}
                        </span>
                        <span className="text-xs">
                          {project.user?.name ||
                            project.user?.fullName ||
                            "Unknown"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
