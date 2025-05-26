import type { ComponentConfig } from "@/types"

interface ContactProps {
  config: ComponentConfig
  tenantTheme?: any
}

export default function Contact({ config, tenantTheme }: ContactProps) {
  const { data } = config

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ color: tenantTheme?.primaryColor || "#111827" }}
          >
            {data.title || "Contact Us"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.subtitle || "Get in touch with our team"}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">{data.formTitle || "Send us a message"}</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                style={{ backgroundColor: tenantTheme?.primaryColor || "#2563eb" }}
              >
                {data.buttonText || "Send Message"}
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">{data.infoTitle || "Contact Information"}</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-6 h-6 text-blue-600 mt-1">📧</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">{data.email || "contact@company.com"}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 text-blue-600 mt-1">📞</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">{data.phone || "+1 (555) 123-4567"}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 text-blue-600 mt-1">📍</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600">{data.address || "123 Main St, City, State 12345"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
