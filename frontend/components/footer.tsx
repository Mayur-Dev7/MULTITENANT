import type { ComponentConfig } from "@/types"

interface FooterProps {
  config: ComponentConfig
  tenantTheme?: any
}

export default function Footer({ config, tenantTheme }: FooterProps) {
  const { data } = config
  const links = data.links || []

  return (
    <footer
      className="bg-gray-900 text-white py-12"
      style={{
        backgroundColor: tenantTheme?.primaryColor || "#111827",
        fontFamily: tenantTheme?.fontFamily || "inherit",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{data.title || "Company Name"}</h3>
            <p className="text-gray-300 mb-4">{data.description || "Your company description goes here."}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.slice(0, 4).map((link: any, index: number) => (
                <li key={index}>
                  <a href={link.href || "#"} className="text-gray-300 hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="text-gray-300 space-y-2">
              <p>{data.email || "contact@company.com"}</p>
              <p>{data.phone || "+1 (555) 123-4567"}</p>
              <p>{data.address || "123 Main St, City, State"}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} {data.title || "Company Name"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
