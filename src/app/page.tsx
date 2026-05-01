"use client";

import { useState } from "react";
import Link from "next/link";
import { tools, categories } from "../data/tools";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = tools.filter((t) => {
    const matchSearch =
      search === "" ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "all" || t.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const grouped: Record<string, typeof tools> = {};
  for (const t of filtered) {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Hero */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Free Online IT Tools
        </h1>
        <p className="mt-2 text-gray-500">
          {tools.length}+ tools for developers, IT professionals, and
          networking engineers. By{" "}
          <strong className="text-gray-700">CHOMRAEUN CHIN</strong>.
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto mb-6 max-w-xl">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search tools... (e.g. JSON, regex, subnet, hash)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selectedCategory === "all"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          All ({tools.length})
        </button>
        {categories.map((cat) => {
          const count = tools.filter((t) => t.category === cat.name).length;
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat.name
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Tools Grid */}
      {Object.entries(grouped).map(([category, catTools]) => {
        const cat = categories.find((c) => c.name === category);
        return (
          <div key={category} className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-white ${cat?.color ?? "bg-gray-500"}`}
              >
                {cat?.icon}
              </span>
              <h2 className="text-lg font-bold text-gray-900">{category}</h2>
              <span className="text-sm text-gray-500">
                ({catTools.length} tools)
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {catTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-indigo-300 hover:shadow-md"
                >
                  <div className="mb-2 text-2xl">{tool.icon}</div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          <p className="text-lg">No tools found for &quot;{search}&quot;</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
