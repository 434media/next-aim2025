"use client"

import { RiArrowRightLine, RiFileDownloadLine, RiFilterLine, RiSearchLine, RiTeamLine } from "@remixicon/react"
import { motion } from "motion/react"
import { useEffect, useMemo, useState } from "react"
import { categories, getCategoryColor, getInstitutionBadgeColor, presentersData } from "../../data/surf-presenters"

export default function SurfPresentersSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [displayCount, setDisplayCount] = useState(6)

  // Filter presenters based on search term and category
  const filteredPresenters = useMemo(() => {
    return presentersData.filter((presenter) => {
      const matchesSearch =
        searchTerm === "" ||
        presenter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        presenter.authors.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "All Categories" || presenter.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const displayedPresenters = filteredPresenters.slice(0, displayCount)
  const hasMorePresenters = displayCount < filteredPresenters.length
  const remainingCount = filteredPresenters.length - displayCount

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(6)
  }, [searchTerm, selectedCategory])

  return (
    <section id="surf-presenters-section" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">2025 SURF Presenters</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#366A79] to-[#8ECAE6] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover groundbreaking research from leading military and civilian institutions advancing healthcare
            innovation
          </p>
        </motion.div>

        {/* Search and Filter Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#366A79] to-[#548cac] text-white">
            <h3 className="text-2xl font-bold mb-2">Explore Poster Presenters</h3>
            <p className="text-sm opacity-90">
              Search through {presentersData.length} presentations across {categories.length - 1} research categories
            </p>
          </div>

          {/* Search and filter controls */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by title, author, or keywords..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#548cac] focus:border-transparent text-gray-800 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search presenters or topics"
                />
                <RiSearchLine
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                  aria-hidden="true"
                />
              </div>
              <div className="relative">
                <button
                  className="flex items-center px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-700 font-medium min-w-[200px] justify-between"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  aria-expanded={isFilterOpen}
                  aria-controls="category-filter"
                >
                  <div className="flex items-center">
                    <RiFilterLine className="mr-2" aria-hidden="true" />
                    {selectedCategory === "All Categories" ? "All Categories" : selectedCategory}
                  </div>
                  <RiArrowRightLine className={`transform transition-transform ${isFilterOpen ? "rotate-90" : ""}`} />
                </button>

                {isFilterOpen && (
                  <motion.div
                    id="category-filter"
                    className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-10 max-h-80 overflow-y-auto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`block w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors ${selectedCategory === category ? "bg-[#548cac]/10 text-[#366A79] font-medium" : ""
                          }`}
                        onClick={() => {
                          setSelectedCategory(category)
                          setIsFilterOpen(false)
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {displayedPresenters.length} of {filteredPresenters.length} presentations
                {selectedCategory !== "All Categories" && (
                  <span className="ml-2 text-[#548cac] font-medium">in {selectedCategory}</span>
                )}
              </p>
              <a
                href="/api/pdf/surf-2025-presenters"
                download="AIM-SURF-2025-Presenters.pdf"
                className="inline-flex items-center text-[#548cac] hover:text-[#366A79] font-medium group"
                aria-label="Download 2025 AIM Poster Presenters"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiFileDownloadLine className="mr-2 transition-transform group-hover:-translate-y-1" />
                Download Full List
              </a>
            </div>
          </div>

          {/* Presenters grid */}
          <div className="p-6">
            {filteredPresenters.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedPresenters.map((presenter, index) => (
                    <motion.div
                      key={presenter.id}
                      className="p-6 border border-gray-200 rounded-xl hover:border-[#548cac] transition-all duration-300 hover:shadow-lg bg-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(presenter.category)}`}
                      >
                        {presenter.category}
                      </span>
                      <h4 className="font-semibold mt-3 text-gray-800 leading-tight line-clamp-3">{presenter.title}</h4>
                      <div className="flex items-start mt-3">
                        <RiTeamLine className="h-4 w-4 mr-2 mt-1 text-gray-400 flex-shrink-0" />
                        <p className="text-sm text-gray-600 line-clamp-2">{presenter.authors}</p>
                      </div>

                      {presenter.institution && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {presenter.institution
                            .split(", ")
                            .slice(0, 2)
                            .map((inst, i) => (
                              <span
                                key={i}
                                className={`text-xs px-2 py-1 rounded-full ${getInstitutionBadgeColor(inst)}`}
                              >
                                {inst}
                              </span>
                            ))}
                          {presenter.institution.split(", ").length > 2 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                              +{presenter.institution.split(", ").length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Show more button */}
                {hasMorePresenters && (
                  <motion.div
                    className="text-center mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <button
                      onClick={() => setDisplayCount((prev) => Math.min(prev + 6, filteredPresenters.length))}
                      className="px-8 py-3 bg-[#548cac] hover:bg-[#366A79] text-white rounded-xl font-medium transition-colors"
                    >
                      Show More ({Math.min(remainingCount, 6)} of {remainingCount} remaining)
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No presentations found matching your criteria.</p>
                <button
                  className="px-6 py-3 bg-[#548cac] hover:bg-[#366A79] text-white rounded-xl font-medium transition-colors"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All Categories")
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
