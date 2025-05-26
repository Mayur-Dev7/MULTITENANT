import { notFound } from "next/navigation"
import { tenantService } from "@/lib/tenant-service"
import ComponentRenderer from "@/frontend/components/component-renderer"

interface TenantPageProps {
  params: {
    domain: string
    slug: string[]
  }
}

export default async function TenantDynamicPage({ params }: TenantPageProps) {
  try {
    const tenant = await tenantService.getTenantByDomain(params.domain)

    if (!tenant || !tenant.isActive) {
      notFound()
    }

    // Construct the full slug path
    const fullSlug = "/" + (params.slug?.join("/") || "")

    // Find the page by slug
    const page = tenant.pages.find((p) => p.slug === fullSlug && p.isActive)

    if (!page) {
      notFound()
    }

    // Get components for this page
    const pageComponents = page.components
      .map((componentId) => tenant.components.find((c) => c.id === componentId))
      .filter(Boolean)
      .filter((c) => c!.isActive)
      .sort((a, b) => a!.position - b!.position)

    return (
      <div className="min-h-screen">
        <head>
          <title>{page.seoTitle || page.name}</title>
          <meta name="description" content={page.seoDescription || ""} />
        </head>

        {pageComponents.map((component) => (
          <ComponentRenderer key={component!.id} config={component!} tenantTheme={tenant.theme} />
        ))}

        {pageComponents.length === 0 && (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{page.name}</h1>
              <p className="text-gray-600 mb-4">This page is under construction.</p>
              <a href="/dashboard" className="text-blue-600 hover:text-blue-800">
                Manage in Dashboard
              </a>
            </div>
          </div>
        )}
      </div>
    )
  } catch (error) {
    notFound()
  }
}
