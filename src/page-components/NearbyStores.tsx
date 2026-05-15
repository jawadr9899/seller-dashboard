"use client";

import React, { useState } from "react";
import { dummyStores } from "@/dummy/nearby-stores";

export default function NearbyStores() {
  const [activeTab, setActiveTab] = useState("nearby");
  const [currentPage, setCurrentPage] = useState(1);

  // Use a fixed number of items per page to avoid heavy JS computations
  const itemsPerPage = 5;

  // Filter stores based on the active tab (e.g., Nearby = distance <= 2.5 km)
  const filteredStores =
    activeTab === "nearby"
      ? dummyStores.filter((store) => parseFloat(store.distance) <= 2.5)
      : dummyStores;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStores.length / itemsPerPage),
  );

  const currentStores = filteredStores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-full w-full flex flex-col font-sans">
      {/* ---------------- MOBILE VIEW ---------------- */}
      <div className="md:hidden flex flex-col h-full overflow-hidden bg-[#f0f3f6]">
        {/* Mobile Top Tabs Toggle with Gradient Background */}
        <div className="pt-6 pb-12 px-4 flex justify-center shrink-0 gradient-cyan-purple rounded-b-[40px] shadow-sm -mb-6 relative z-0">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 flex w-full max-w-[320px] shadow-inner">
            <button
              onClick={() => {
                setActiveTab("nearby");
                setCurrentPage(1);
              }}
              className={`flex-1 py-3 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === "nearby"
                  ? "bg-white text-[#007489] shadow-md"
                  : "text-white/80"
              }`}
            >
              {activeTab === "nearby" && (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              Nearby Stores
            </button>
            <button
              onClick={() => {
                setActiveTab("all");
                setCurrentPage(1);
              }}
              className={`flex-1 py-3 px-4 rounded-full text-sm font-bold transition-all ${
                activeTab === "all"
                  ? "bg-white text-[#007489] shadow-md"
                  : "text-white/80 hover:text-white"
              }`}
            >
              All Stores
            </button>
          </div>
        </div>

        {/* Mobile Main Content Area */}
        <div className="bg-[#fcfdfd] rounded-t-[32px] pt-8 px-6 pb-6 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] flex-1 flex flex-col overflow-hidden relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-[5px] h-[20px] bg-[#00a3b4] rounded-full"></div>
              <h3 className="text-[19px] font-bold text-[#002b3d]">
                {activeTab === "nearby" ? "Trending Nearby" : "All Stores"}
              </h3>
            </div>
            <button className="text-[13px] font-bold text-[#00a3b4] tracking-wide uppercase">
              FILTERS
            </button>
          </div>

          {/* Mobile Cards - CSS constraints handle overflow */}
          <div className="flex-1 flex flex-col gap-3 overflow-hidden">
            {currentStores.slice(0, 4).map((store, index) => (
              <div
                key={index}
                className="bg-white rounded-[24px] p-4 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50/50 shrink-0"
              >
                {/* Image */}
                <div className="relative shrink-0">
                  <div className="w-[72px] h-[72px] rounded-full p-[2px] bg-gradient-to-tr from-[#00a3b4] to-[#007489]">
                    <img
                      src={store.image}
                      alt={store.mobileName}
                      className="w-full h-full rounded-full border-2 border-white object-cover"
                    />
                  </div>
                  {store.isNew && (
                    <span className="absolute -bottom-1 -right-2 bg-[#ff5298] text-white text-[10px] font-bold px-2 py-[2px] rounded-md uppercase tracking-wider border-2 border-white">
                      NEW
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-[#002b3d] text-[17px] truncate">
                      {store.mobileName}
                    </h4>
                    <span className="flex items-center text-[#ff5298] text-[13px] font-bold shrink-0">
                      <svg
                        className="w-3.5 h-3.5 mr-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {store.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#00a3b4] text-[12px] font-bold tracking-wide uppercase">
                      {store.mobileCategory}
                    </span>
                    <span className="text-[#00a3b4] text-[13px] font-medium">
                      {store.mobileDistance}
                    </span>
                  </div>
                </div>

                {/* Arrow Button */}
                <button className="w-11 h-11 shrink-0 bg-[#f4f7f8] rounded-xl flex items-center justify-center text-[#002b3d] hover:bg-[#e4ebed] transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {currentStores.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-400">
                No stores found.
              </div>
            )}
          </div>

          {/* Mobile Pagination */}
          <div className="flex justify-center items-center gap-2 mt-4 shrink-0">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f4f7f8] text-[#cbd5db] disabled:opacity-50 transition-opacity"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-[15px] ${
                    isActive
                      ? "gradient-blue-pink text-white"
                      : "text-[#007489]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f4f7f8] text-[#002b3d] disabled:opacity-50 transition-opacity"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- DESKTOP VIEW ---------------- */}
      <div className="hidden md:flex flex-col max-w-[1200px] w-full mx-auto p-8 h-full overflow-hidden relative">
        {/* Desktop Header area */}
        <div className="flex items-center justify-between mb-8 shrink-0 relative z-10">
          <h2 className="text-3xl font-bold text-[#002b3d]">Store Explorer</h2>
        
        </div>

        {/* Gradient Header for Desktop Tabs */}
        <div className="absolute top-0 left-0 right-0 h-[280px] gradient-cyan-purple z-0 rounded-b-[60px] opacity-10 pointer-events-none"></div>

        {/* Desktop Main Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex-1 flex flex-col overflow-hidden relative z-10">
          {/* Top Bar inside card */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 shrink-0">
            <div className="flex gap-8">
              <button
                onClick={() => {
                  setActiveTab("nearby");
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 pb-4 -mb-[17px] text-[15px] font-bold transition-colors ${
                  activeTab === "nearby"
                    ? "text-[#00a3b4] border-b-2 border-[#00a3b4]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Nearby Stores
              </button>
              <button
                onClick={() => {
                  setActiveTab("all");
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 pb-4 -mb-[17px] text-[15px] font-bold transition-colors ${
                  activeTab === "all"
                    ? "text-[#00a3b4] border-b-2 border-[#00a3b4]"
                    : "text-[#7da2a9] hover:text-[#007489]"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                All Stores
              </button>
            </div>

            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-[#7da2a9] text-[14px] font-bold hover:text-[#007489]">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
              </button>
              <button className="flex items-center gap-2 text-[#7da2a9] text-[14px] font-bold hover:text-[#007489]">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
                Sort
              </button>
            </div>
          </div>

          {/* Desktop Table - Pure CSS handles overflow without JS calcs */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <table className="w-full text-left border-collapse flex flex-col h-full">
              <thead className="shrink-0 w-full display-table">
                <tr className="text-[11px] font-bold text-[#8fa7af] uppercase tracking-wider border-b border-gray-50 flex w-full">
                  <th className="pb-4 font-extrabold w-[35%]">Store Name</th>
                  <th className="pb-4 font-extrabold w-[15%]">Category</th>
                  <th className="pb-4 font-extrabold w-[15%]">Distance</th>
                  <th className="pb-4 font-extrabold w-[15%]">Rating</th>
                  <th className="pb-4 font-extrabold w-[10%]">Status</th>
                  <th className="pb-4 font-extrabold w-[10%] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="flex-1 flex flex-col divide-y divide-gray-50/50 overflow-hidden">
                {currentStores.map((store, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/30 transition-colors group flex w-full items-center shrink-0 min-h-[85px] max-h-[90px]"
                  >
                    <td className="w-[35%] py-2">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-[14px] bg-[#f4f7f8] overflow-hidden shrink-0 border border-gray-100">
                          <img
                            src={store.image}
                            alt={store.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#002b3d] text-[16px] truncate">
                            {store.name}
                          </div>
                          <div className="text-[13px] text-[#7da2a9] font-medium mt-0.5">
                            ID: {store.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="w-[15%] py-2">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-[#f4f7f8] text-[#00a3b4] text-[13px] font-bold">
                        {store.category}
                      </span>
                    </td>
                    <td className="w-[15%] py-2 text-[#002b3d] text-[15px] font-medium">
                      {store.distance}
                    </td>
                    <td className="w-[15%] py-2">
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4 text-[#00a3b4]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold text-[#002b3d] text-[15px]">
                          {store.rating}
                        </span>
                        <span className="text-[#8fa7af] text-[14px]">
                          ({store.reviews})
                        </span>
                      </div>
                    </td>
                    <td className="w-[10%] py-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${store.status === "Active" ? "bg-[#00c853]" : "bg-[#b0bec5]"}`}
                        ></div>
                        <span
                          className={`text-[14px] font-bold ${store.status === "Active" ? "text-[#00a3b4]" : "text-[#8fa7af]"}`}
                        >
                          {store.status}
                        </span>
                      </div>
                    </td>
                    <td className="w-[10%] py-2 flex justify-end">
                      <div className="flex items-center gap-3 pr-2">
                        <button className="text-[#00a3b4] hover:text-[#007489] transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </button>
                        <button className="text-[#00a3b4] hover:text-[#007489] transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {currentStores.length === 0 && (
                  <tr className="flex items-center justify-center h-full text-gray-400">
                    <td>No stores found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Desktop Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 shrink-0">
            <div className="text-[#00a3b4] text-[14px] font-bold">
              Showing{" "}
              {currentStores.length > 0
                ? (currentPage - 1) * itemsPerPage + 1
                : 0}
              -{Math.min(currentPage * itemsPerPage, filteredStores.length)} of{" "}
              {filteredStores.length} stores
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#8fa7af] hover:bg-[#f4f7f8] transition-colors disabled:opacity-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                const isActive = currentPage === page;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-xl font-bold text-[14px] transition-colors ${
                      isActive
                        ? "gradient-blue-pink text-white"
                        : "text-[#8fa7af] hover:bg-[#f4f7f8]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#00a3b4] hover:bg-[#f4f7f8] transition-colors disabled:opacity-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
