import Image from "next/image"
import type { ComponentConfig } from "@/types"

interface HeroProps {
  config: ComponentConfig
  tenantTheme?: any
}

export default function HeroCentered({ config, tenantTheme }: HeroProps) {
  const { data } = config

  return (
    <section
      className="bg-gray-50 py-32"
      style={{
        backgroundColor: tenantTheme?.secondaryColor || "#f9fafb",
        fontFamily: tenantTheme?.fontFamily || "inherit",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-8"
          style={{ color: tenantTheme?.primaryColor || "#111827" }}
        >
          {data.title || "Welcome to Our Site"}
        </h1>
        <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {data.subtitle || "Discover amazing features and services"}
        </p>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          {data.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </p>

        {data.image && (
          <div className="mb-12">
            <Image
              src={data.image || "/placeholder.svg"}
              alt={data.title || "Hero image"}
              width={600}
              height={400}
              className="rounded-lg shadow-2xl mx-auto"
            />
          </div>
        )}

        {data.buttonText && (
          <a
            href={data.buttonLink || "#"}
            className="inline-block bg-blue-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            style={{ backgroundColor: tenantTheme?.primaryColor || "#2563eb" }}
          >
            {data.buttonText}
          </a>
        )}
      </div>
    </section>
  )
}
