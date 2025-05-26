export default function TenantTestPage({ params }: { params: { domain: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Tenant Test Page</h1>
        <p className="text-blue-600">Domain: {params.domain}</p>
        <p className="text-sm text-gray-500">If you see this, routing is working!</p>
      </div>
    </div>
  )
}
