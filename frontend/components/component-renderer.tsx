import type { ComponentConfig } from "@/types"

// Navbar variants
import NavbarDefault from "./navbar/navbar-default"
import NavbarCentered from "./navbar/navbar-centered"
import NavbarSidebar from "./navbar/navbar-sidebar"

// Hero variants
import HeroDefault from "./hero/hero-default"
import HeroCentered from "./hero/hero-centered"
import HeroFullscreen from "./hero/hero-fullscreen"

// Keep existing components
import Features from "./features"
import Footer from "./footer"
import Contact from "./contact"

interface ComponentRendererProps {
  config: ComponentConfig
  tenantTheme?: any
}

export default function ComponentRenderer({ config, tenantTheme }: ComponentRendererProps) {
  if (!config.isActive) return null

  // Render based on type and variant
  switch (config.type) {
    case "navbar":
      switch (config.variant) {
        case "centered":
          return <NavbarCentered config={config} tenantTheme={tenantTheme} />
        case "sidebar":
          return <NavbarSidebar config={config} tenantTheme={tenantTheme} />
        default:
          return <NavbarDefault config={config} tenantTheme={tenantTheme} />
      }

    case "hero":
      switch (config.variant) {
        case "centered":
          return <HeroCentered config={config} tenantTheme={tenantTheme} />
        case "fullscreen":
          return <HeroFullscreen config={config} tenantTheme={tenantTheme} />
        default:
          return <HeroDefault config={config} tenantTheme={tenantTheme} />
      }

    case "features":
      return <Features config={config} tenantTheme={tenantTheme} />
    case "contact":
      return <Contact config={config} tenantTheme={tenantTheme} />
    case "footer":
      return <Footer config={config} tenantTheme={tenantTheme} />
    default:
      return null
  }
}
