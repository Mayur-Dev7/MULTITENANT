import Image from "next/image"
import type { ComponentConfig } from "@/types"

interface HeroProps {
  config: ComponentConfig
  tenantTheme?: any
}

export default function Hero({ config, tenantTheme }: HeroProps) {
  const { data } = config

  return (
    <section
      className="bg-gray-50 py-20"
      style={{
        backgroundColor: tenantTheme?.secondaryColor || "#f9fafb",
        fontFamily: tenantTheme?.fontFamily || "inherit",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              style={{ color: tenantTheme?.primaryColor || "#111827" }}
            >
              {data.title || "Welcome to Our Site"}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{data.subtitle || "Discover amazing features and services"}</p>
            <p className="text-gray-700 mb-8">
              {data.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            </p>
            {data.buttonText && (
              <a
                href={data.buttonLink || "#"}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                style={{ backgroundColor: tenantTheme?.primaryColor || "#2563eb" }}
              >
                {data.buttonText}
              </a>
            )}
          </div>

          <div className="flex justify-center">
            {data.image ? (
              <Image
                src={data.image || "/placeholder.svg"}
                alt={data.title || "Hero image"}
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Hero Image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
