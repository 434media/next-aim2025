"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { RiArrowDownSLine, RiCloseLine } from "@remixicon/react"
import { AIMLogo } from "../../../public/AIMLogo"
import NewsTicker from "./NewsTicker"
import type { MenuItem, NewsItem, EventInfo } from "./types"

interface MobileMenuProps {
  isOpen: boolean
  closeMenu: () => void
  menuItems: MenuItem[]
  eventInfo: EventInfo
  newsItems: NewsItem[]
}

export default function MobileMenu({ isOpen, closeMenu, menuItems, eventInfo, newsItems }: MobileMenuProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop - Higher z-index to ensure it's above hero content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
        aria-hidden="true"
      />

      {/* Mobile Menu Panel - Highest z-index to ensure it's always on top */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          duration: 0.3,
        }}
        className="fixed inset-4 max-w-sm ml-auto bg-[#101310]/98 backdrop-blur-xl z-[60] shadow-2xl rounded-2xl overflow-hidden border border-white/10 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#548cac]/5 to-[#548cac]/10" />

        {/* Header */}
        <motion.div
          className="flex items-center justify-between p-6 border-b border-[#548cac]/20 bg-[#101310]/50 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-white">Menu</h2>
          <motion.button
            onClick={closeMenu}
            className="p-3 rounded-xl hover:bg-[#548cac]/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] relative overflow-hidden min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Close menu"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/20 to-[#548cac]/0 opacity-0 hover:opacity-100 rounded-xl"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <RiCloseLine className="size-6 text-white relative z-10" />
          </motion.button>
        </motion.div>

        {/* Event Info */}
        <motion.div
          className="p-6 border-b border-[#548cac]/20 bg-gradient-to-r from-[#101310]/80 to-[#101310]/60 flex-shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <AIMLogo variant="white" className="h-12 w-auto" />
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-white">{eventInfo.aim.date}</p>
                <p className="text-xs text-white/80 leading-tight">{eventInfo.venue}</p>
              </div>
            </div>
            <motion.div
              className="bg-gradient-to-r from-[#548cac]/20 to-[#548cac]/30 px-3 py-2 rounded-full border border-[#548cac]/30"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xs text-center font-medium text-[#548cac]">{eventInfo.location}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Navigation */}
          <nav className="p-6">
            <ul className="space-y-4" role="list">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                >
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <motion.div
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-[#548cac]/10 transition-all duration-300 relative overflow-hidden min-h-[48px] cursor-pointer"
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        aria-expanded={activeDropdown === item.name}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Button background effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/10 to-[#548cac]/0 opacity-0 hover:opacity-100 rounded-xl"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10 text-lg font-medium text-white">{item.name}</span>
                        <motion.div
                          className="relative z-10"
                          animate={{
                            rotate: activeDropdown === item.name ? 180 : 0,
                            color: activeDropdown === item.name ? "#548cac" : "currentColor",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <RiArrowDownSLine className="size-5 text-white" aria-hidden="true" />
                        </motion.div>
                      </motion.div>

                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.ul
                            className="pl-4 space-y-2 overflow-hidden"
                            role="menu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          >
                            {item.dropdown.map((subItem, subIndex) => (
                              <motion.li
                                key={subItem.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05, duration: 0.2 }}
                              >
                                {subItem.href && (
                                  <Link
                                    href={subItem.href}
                                    className="group block text-base font-medium text-white/80 hover:text-[#548cac] p-4 rounded-lg hover:bg-[#548cac]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-inset relative overflow-hidden min-h-[48px] items-center"
                                    onClick={closeMenu}
                                    role="menuitem"
                                  >
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/10 to-[#548cac]/0 opacity-0 group-hover:opacity-100 rounded-lg"
                                      initial={{ x: "-100%" }}
                                      whileHover={{ x: "100%" }}
                                      transition={{ duration: 0.6 }}
                                    />
                                    <span className="relative z-10">{subItem.name}</span>
                                  </Link>
                                )}
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    item.href && (
                      <motion.div whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href={item.href}
                          className="group block text-lg font-medium text-white hover:text-[#548cac] p-4 rounded-xl hover:bg-[#548cac]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] relative overflow-hidden min-h-[48px] items-center"
                          onClick={closeMenu}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/10 to-[#548cac]/0 opacity-0 group-hover:opacity-100 rounded-lg"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                          <span className="relative z-10">{item.name}</span>
                        </Link>
                      </motion.div>
                    )
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Mobile News Ticker */}
          <NewsTicker newsItems={newsItems} isDesktop={false} onClose={closeMenu} />
        </div>
      </motion.div>
    </>
  )
}
