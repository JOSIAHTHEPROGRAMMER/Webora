import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { jobs } from "../assets/assets";
import Pagination from "./Pagination";

const CareersSection: React.FC = () => {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const departments = ["all", ...new Set(jobs.map((job) => job.department))];

  // Filtered jobs
  const filteredJobs =
    filter === "all" ? jobs : jobs.filter((job) => job.department === filter);

  // Pagination logic
  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const toggleJob = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const getExperienceBadgeColor = (experience: string) => {
    switch (experience) {
      case "Entry-Level":
        return "from-emerald-400 to-teal-500";
      case "Mid-Level":
        return "from-teal-400 to-cyan-500";
      case "Senior":
        return "from-cyan-500 to-blue-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <section className="py-24 px-4 md:px-16 lg:px-24 xl:px-40 bg-transparent">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-100">
          Join Our Team
        </h2>
        <div className="w-24 h-1 bg-linear-to-r from-teal-400 to-cyan-400 mx-auto rounded-full mt-4" />
        <p className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed">
          Be part of our company. We're building a vibrant, innovative website
          that brings thoughts and ideas to life.
        </p>
      </div>

      {/* Department Filter */}
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => {
              setFilter(dept);
              setCurrentPage(1); // reset to first page on filter change
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === dept
                ? "bg-linear-to-r from-teal-500 to-cyan-500 text-white shadow-md"
                : "bg-black/30 text-gray-300 border border-white/10 hover:border-teal-400"
            }`}
          >
            {dept === "all" ? "All Positions" : dept}
          </button>
        ))}
      </div>

      {/* Job Count */}
      <div className="mt-8 text-center text-sm text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-200">
          {paginatedJobs.length}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-200">
          {filteredJobs.length}
        </span>{" "}
        position{filteredJobs.length !== 1 && "s"}
      </div>

      {/* Job Cards */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {paginatedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-teal-400/40 transition-all duration-300"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-100">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{job.department}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-linear-to-r ${getExperienceBadgeColor(
                    job.experience,
                  )}`}
                >
                  {job.experience}
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                {job.description}
              </p>

              {/* Job Meta Info */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {(
                  [
                    [MapPin, job.location],
                    [Clock, job.type],
                    [DollarSign, job.salary],
                    [
                      Calendar,
                      `Posted ${new Date(job.posted).toLocaleDateString()}`,
                    ],
                  ] as [LucideIcon, string][]
                ).map(([Icon, value], i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <Icon className="w-4 h-4 text-gray-500" />
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expandable Details */}
            {expandedJob === job.id && (
              <div className="p-6 bg-teal-950/30 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-200 mb-2">
                    Responsibilities
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-teal-400 mt-1">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-200 mb-2">
                    Requirements
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Card Footer */}
            <div className="p-6 border-t border-white/10 flex items-center gap-3">
              <button
                onClick={() => toggleJob(job.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-300 bg-black/30 border border-white/10 rounded-lg hover:bg-black/50 transition"
              >
                {expandedJob === job.id ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Less Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    More Details
                  </>
                )}
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-md bg-linear-to-r from-teal-500 to-cyan-500 hover:from-emerald-500 hover:to-teal-500 transition-all">
                <Briefcase className="w-4 h-4" />
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
    </section>
  );
};

export default CareersSection;
