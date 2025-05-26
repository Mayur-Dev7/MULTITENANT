import Link from "next/link"
import type { ComponentConfig } from "@/types"

interface NavbarProps {
  config: ComponentConfig
  tenantTheme?: any
}

export default function NavbarCentered({ config, tenantTheme }: NavbarProps) {
  const { data } = config
  const links = data.links || []

  return (
    <nav
      className="bg-white shadow-lg sticky top-0 z-50"
      style={{
        backgroundColor: tenantTheme?.primaryColor || "#ffffff",
        fontFamily: tenantTheme?.fontFamily || "inherit",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-4">
          <Link href="/" className="text-2xl font-bold text-white mb-4">
            {data.title || "Logo"}
          </Link>

          <div className="flex items-center space-x-8">
            {links.map((link: any, index: number) => (
              <a
                key={index}
                href={link.href || "#"}
                className="text-white hover:text-gray-200 px-4 py-2 text-sm font-medium transition-colors border-b-2 border-transparent hover:border-white/50"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
