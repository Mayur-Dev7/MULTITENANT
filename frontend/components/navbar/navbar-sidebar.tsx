"use client"

import { useState } from "react"
import Link from "next/link"
import type { ComponentConfig } from "@/types"

interface NavbarProps {
  config: ComponentConfig
  tenantTheme?: any
}

export default function NavbarSidebar({ config, tenantTheme }: NavbarProps) {
  const { data } = config
  const links = data.links || []
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav
        className="bg-white shadow-sm border-b sticky top-0 z-50"
        style={{
          backgroundColor: tenantTheme?.primaryColor || "#ffffff",
          fontFamily: tenantTheme?.fontFamily || "inherit",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gray-200 mr-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/" className="text-xl font-bold text-white">
                {data.title || "Logo"}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: tenantTheme?.primaryColor || "#ffffff" }}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">{data.title || "Menu"}</h2>
          <nav className="space-y-4">
            {links.map((link: any, index: number) => (
              <a
                key={index}
                href={link.href || "#"}
                className="block text-white hover:text-gray-200 py-2 px-4 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>}
    </>
  )
}
