import { getDatabase } from "./mongodb"
import type { Tenant } from "@/types"

export async function initializeDatabase() {
  const db = await getDatabase()

  const existingTenant = await db.collection("tenants").findOne({ subdomain: "demo" })
  if (existingTenant) {
    console.log("Demo tenant already exists")
    return existingTenant
  }

  const demoTenant: Omit<Tenant, "_id"> = {
    name: "Demo Company",
    domain: "",
    subdomain: "demo",
    isActive: true,
    theme: {
      primaryColor: "#3b82f6",
      secondaryColor: "#f8fafc",
      fontFamily: "Inter",
    },
    components: [
      {
        id: "navbar_demo",
        type: "navbar",
        variant: "default",
        name: "Navigation Bar",
        isActive: true,
        data: {
          title: "Demo Corp",
          links: [
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Services", href: "/services" },
            { name: "Contact", href: "/contact" },
          ],
        },
        position: 0,
      },
      {
        id: "hero_demo",
        type: "hero",
        variant: "default",
        name: "Hero Section",
        isActive: true,
        data: {
          title: "Welcome to Demo Corp",
          subtitle: "Innovation at its finest",
          description:
            "We provide cutting-edge solutions for modern businesses. Our team of experts is dedicated to helping you achieve your goals with the latest technology and best practices.",
          buttonText: "Get Started",
          buttonLink: "#contact",
          image: "/placeholder.svg?height=400&width=500",
        },
        position: 1,
      },
      {
        id: "features_demo",
        type: "features",
        variant: "default",
        name: "Features Section",
        isActive: true,
        data: {
          title: "Why Choose Us",
          subtitle: "We deliver excellence in every project",
          items: [
            {
              title: "Fast Performance",
              description: "Lightning-fast load times and optimized performance for the best user experience.",
              icon: "⚡",
            },
            {
              title: "Secure & Reliable",
              description: "Bank-level security with 99.9% uptime guarantee for your peace of mind.",
              icon: "🔒",
            },
            {
              title: "24/7 Support",
              description: "Round-the-clock customer support to help you whenever you need assistance.",
              icon: "🛟",
            },
          ],
        },
        position: 2,
      },
      {
        id: "contact_demo",
        type: "contact",
        variant: "default",
        name: "Contact Section",
        isActive: true,
        data: {
          title: "Get In Touch",
          subtitle: "Ready to start your project? Contact us today",
          formTitle: "Send us a message",
          infoTitle: "Contact Information",
          buttonText: "Send Message",
          email: "hello@democorp.com",
          phone: "+1 (555) 123-4567",
          address: "123 Innovation Drive, Tech City, TC 12345",
        },
        position: 3,
      },
      {
        id: "footer_demo",
        type: "footer",
        variant: "default",
        name: "Footer",
        isActive: true,
        data: {
          title: "Demo Corp",
          description: "Building the future, one innovation at a time.",
          links: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
          ],
          email: "hello@democorp.com",
          phone: "+1 (555) 123-4567",
          address: "123 Innovation Drive, Tech City, TC 12345",
        },
        position: 4,
      },
    ],
    pages: [
      {
        id: "home_page",
        name: "Home",
        slug: "/",
        isActive: true,
        components: ["navbar_demo", "hero_demo", "features_demo", "contact_demo", "footer_demo"],
        seoTitle: "Demo Corp - Innovation at its finest",
        seoDescription: "Welcome to Demo Corp, where we provide cutting-edge solutions for modern businesses.",
      },
      {
        id: "about_page",
        name: "About",
        slug: "/about",
        isActive: true,
        components: ["navbar_demo", "hero_demo", "footer_demo"],
        seoTitle: "About Us - Demo Corp",
        seoDescription: "Learn more about Demo Corp and our mission.",
      },
      {
        id: "contact_page",
        name: "Contact",
        slug: "/contact",
        isActive: true,
        components: ["navbar_demo", "contact_demo", "footer_demo"],
        seoTitle: "Contact Us - Demo Corp",
        seoDescription: "Get in touch with Demo Corp today.",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await db.collection("tenants").insertOne(demoTenant)
  console.log("Demo tenant created with ID:", result.insertedId)

  return { ...demoTenant, _id: result.insertedId.toString() }
}
