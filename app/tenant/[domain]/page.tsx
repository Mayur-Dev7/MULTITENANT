import { tenantService } from "@/lib/tenant-service"
import ComponentRenderer from "@/frontend/components/component-renderer"

interface TenantPageProps {
  params: {
    domain: string
  }
}

export default async function TenantPage({ params }: TenantPageProps) {
  try {
    const tenant = await tenantService.getTenantByDomain(params.domain)

    if (!tenant || !tenant.isActive) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Site Not Found</h1>
            <p className="text-gray-600 mb-4">The tenant "{params.domain}" could not be found or is inactive.</p>
            <a href="/dashboard" className="text-blue-600 hover:text-blue-800">
              Go to Dashboard
            </a>
          </div>
        </div>
      )
    }

    const sortedComponents = tenant.components.filter((comp) => comp.isActive).sort((a, b) => a.position - b.position)

    return (
      <div className="min-h-screen">
        {sortedComponents.map((component) => (
          <ComponentRenderer key={component.id} config={component} tenantTheme={tenant.theme} />
        ))}

        {sortedComponents.length === 0 && (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to {tenant.name}</h1>
              <p className="text-gray-600 mb-4">This site is under construction. Please check back later.</p>
              <a href="/dashboard" className="text-blue-600 hover:text-blue-800">
                Manage in Dashboard
              </a>
            </div>
          </div>
        )}
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-900 mb-4">Error Loading Site</h1>
          <p className="text-red-600 mb-4">Domain: {params.domain}</p>
          <a href="/dashboard" className="text-blue-600 hover:text-blue-800">
            Go to Dashboard
          </a>
        </div>
      </div>
    )
  }
}
