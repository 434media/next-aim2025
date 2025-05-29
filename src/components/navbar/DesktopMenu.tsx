"use client"

import { useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { RiArrowDownSLine } from "@remixicon/react"
import type { MenuItem } from "./types"

interface DesktopMenuProps {
  menuItems: MenuItem[]
  activeDropdown: string | null
  setActiveDropdown: (dropdown: string | null) => void
}

export default function DesktopMenu({ menuItems, activeDropdown, setActiveDropdown }: DesktopMenuProps) {
  const handleDropdownEnter = useCallback(
    (itemName: string) => {
      setActiveDropdown(itemName)
    },
    [setActiveDropdown],
  )

  const handleDropdownLeave = useCallback(() => {
    setActiveDropdown(null)
  }, [setActiveDropdown])

  return (
    <div className="hidden md:flex items-center space-x-1">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.name}
          className="relative group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
          onMouseEnter={() => item.dropdown && handleDropdownEnter(item.name)}
          onMouseLeave={() => item.dropdown && handleDropdownLeave()}
        >
          {item.dropdown ? (
            <motion.button
              className="flex items-center text-sm font-medium text-white hover:text-[#548cac] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-[#101310] rounded-lg px-3 py-2 relative overflow-hidden"
              onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
              aria-expanded={activeDropdown === item.name}
              aria-haspopup="true"
              whileHover={{
                scale: 1.02,
                y: -1,
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/10 to-[#548cac]/0 opacity-0 group-hover:opacity-100 rounded-lg"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              <span className="relative z-10">{item.name}</span>
              <motion.div
                className="relative z-10 ml-1"
                animate={{
                  rotate: activeDropdown === item.name ? 180 : 0,
                  color: activeDropdown === item.name ? "#548cac" : "currentColor",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <RiArrowDownSLine className="size-4" aria-hidden="true" />
              </motion.div>
            </motion.button>
          ) : (
            <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
              {item.href && (
                <Link
                  href={item.href}
                  className="group flex items-center text-sm font-medium text-white hover:text-[#548cac] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-[#101310] rounded-lg px-3 py-2 relative overflow-hidden"
                >
                  {/* Hover background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/10 to-[#548cac]/0 opacity-0 group-hover:opacity-100 rounded-lg"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              )}
            </motion.div>
          )}

          {/* Enhanced Dropdown Menu - Fixed positioning to prevent cutoff */}
          {item.dropdown && (
            <AnimatePresence>
              {activeDropdown === item.name && (
                <motion.div
                  className="fixed mt-2 bg-[#101310]/95 backdrop-blur-xl rounded-xl shadow-2xl ring-1 ring-white/10 z-50 overflow-hidden"
                  style={{
                    width: "16rem", // 64px = 16rem
                    top: "auto", // Let it position itself based on the parent
                    left: "auto", // Let it position itself based on the parent
                  }}
                  role="menu"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Dropdown background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#548cac]/5 to-transparent" />

                  <div className="py-2">
                    {item.dropdown.map((subItem, subIndex) => (
                      <motion.div
                        key={subItem.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: subIndex * 0.05, duration: 0.2 }}
                      >
                        {subItem.href && (
                          <Link
                            href={subItem.href}
                            className="group block px-4 py-3 text-sm text-white hover:bg-[#548cac]/20 hover:text-[#548cac] focus:outline-none focus:bg-[#548cac]/20 focus:text-[#548cac] transition-all duration-200 relative overflow-hidden"
                            role="menuitem"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {/* Hover effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/10 to-[#548cac]/0 opacity-0 group-hover:opacity-100 rounded-lg"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.5 }}
                            />
                            <span className="relative z-10">{subItem.name}</span>
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      ))}
    </div>
  )
}
