import Link from "next/link"
import type { ComponentConfig } from "@/types"

interface NavbarProps {
  config: ComponentConfig
  tenantTheme?: any
}

export default function NavbarDefault({ config, tenantTheme }: NavbarProps) {
  const { data } = config
  const links = data.links || []

  return (
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
            <Link href="/" className="text-xl font-bold text-white">
              {data.title || "Logo"}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link: any, index: number) => (
              <a
                key={index}
                href={link.href || "#"}
                className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="flex items-center space-x-2 ml-4 border-l border-white/20 pl-4">
              <Link
                href="/dashboard"
                className="bg-white/20 text-white px-3 py-1 rounded text-sm hover:bg-white/30 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/"
                className="bg-white/20 text-white px-3 py-1 rounded text-sm hover:bg-white/30 transition-colors"
              >
                Home
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-gray-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
