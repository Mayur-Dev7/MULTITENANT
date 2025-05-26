import type { ComponentConfig } from "@/types"

interface HeroProps {
  config: ComponentConfig
  tenantTheme?: any
}

export default function HeroFullscreen({ config, tenantTheme }: HeroProps) {
  const { data } = config

  return (
    <section
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: data.image ? `url(${data.image})` : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: tenantTheme?.fontFamily || "inherit",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl md:text-8xl font-bold mb-8">{data.title || "Welcome to Our Site"}</h1>
        <p className="text-2xl md:text-3xl mb-8 opacity-90">
          {data.subtitle || "Discover amazing features and services"}
        </p>
        <p className="text-lg md:text-xl mb-12 opacity-80 max-w-2xl mx-auto">
          {data.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </p>

        {data.buttonText && (
          <a
            href={data.buttonLink || "#"}
            className="inline-block bg-white text-gray-900 px-12 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            {data.buttonText}
          </a>
        )}
      </div>
    </section>
  )
}
