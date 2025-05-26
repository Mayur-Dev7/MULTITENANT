import type { ComponentConfig } from "@/types"

interface FeaturesProps {
  config: ComponentConfig
  tenantTheme?: any
}

export default function Features({ config, tenantTheme }: FeaturesProps) {
  const { data } = config
  const features = data.items || []

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ color: tenantTheme?.primaryColor || "#111827" }}
          >
            {data.title || "Our Features"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.subtitle || "Discover what makes us special"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature: any, index: number) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                {feature.icon ? (
                  <span className="text-2xl">{feature.icon}</span>
                ) : (
                  <div className="w-8 h-8 bg-blue-500 rounded"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title || "Feature Title"}</h3>
              <p className="text-gray-600">{feature.description || "Feature description goes here"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
