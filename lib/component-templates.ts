import type { ComponentTemplate, ComponentVariant } from "@/types"

export const componentVariants: ComponentVariant[] = [
  // Navbar variants
  {
    type: "navbar",
    variant: "default",
    name: "Default Navbar",
    description: "Standard horizontal navigation bar",
    preview: "Horizontal layout with logo on left, links on right",
  },
  {
    type: "navbar",
    variant: "centered",
    name: "Centered Navbar",
    description: "Centered logo with navigation below",
    preview: "Logo centered at top, navigation links centered below",
  },
  {
    type: "navbar",
    variant: "sidebar",
    name: "Sidebar Navbar",
    description: "Hamburger menu with slide-out sidebar",
    preview: "Hamburger icon that opens sidebar navigation",
  },

  // Hero variants
  {
    type: "hero",
    variant: "default",
    name: "Default Hero",
    description: "Two-column layout with text and image",
    preview: "Text on left, image on right, side-by-side layout",
  },
  {
    type: "hero",
    variant: "centered",
    name: "Centered Hero",
    description: "Centered content with large text",
    preview: "All content centered, large typography, image below text",
  },
  {
    type: "hero",
    variant: "fullscreen",
    name: "Fullscreen Hero",
    description: "Full-screen background with overlay text",
    preview: "Background image covers full screen, text overlaid in center",
  },

  // Other components (single variant for now)
  {
    type: "features",
    variant: "default",
    name: "Features Grid",
    description: "Grid layout of feature cards",
    preview: "3-column grid of feature cards with icons",
  },
  {
    type: "contact",
    variant: "default",
    name: "Contact Form",
    description: "Contact form with information sidebar",
    preview: "Form on left, contact info on right",
  },
  {
    type: "footer",
    variant: "default",
    name: "Standard Footer",
    description: "Multi-column footer with links",
    preview: "Company info, links, and contact details in columns",
  },
]

export const componentTemplates: ComponentTemplate[] = [
  {
    type: "navbar",
    variant: "default",
    name: "Default Navigation Bar",
    description: "Standard horizontal navigation",
    defaultData: {
      title: "Logo",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Contact", href: "/contact" },
      ],
    },
    fields: [
      { name: "title", label: "Logo Text", type: "text", required: true },
      { name: "links", label: "Navigation Links", type: "array" },
    ],
  },
  {
    type: "hero",
    variant: "default",
    name: "Default Hero Section",
    description: "Two-column hero with text and image",
    defaultData: {
      title: "Welcome to Our Site",
      subtitle: "Discover amazing features",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      buttonText: "Get Started",
      buttonLink: "#",
      image: "/placeholder.svg?height=400&width=500",
    },
    fields: [
      { name: "title", label: "Main Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "buttonText", label: "Button Text", type: "text" },
      { name: "buttonLink", label: "Button Link", type: "url" },
      { name: "image", label: "Hero Image URL", type: "url" },
    ],
  },
  {
    type: "features",
    variant: "default",
    name: "Features Section",
    description: "Grid of feature cards",
    defaultData: {
      title: "Our Features",
      subtitle: "What makes us special",
      items: [
        { title: "Fast", description: "Lightning fast performance", icon: "⚡" },
        { title: "Secure", description: "Bank-level security", icon: "🔒" },
        { title: "Reliable", description: "99.9% uptime guarantee", icon: "✅" },
      ],
    },
    fields: [
      { name: "title", label: "Section Title", type: "text", required: true },
      { name: "subtitle", label: "Section Subtitle", type: "text" },
      { name: "items", label: "Feature Items", type: "array" },
    ],
  },
]
