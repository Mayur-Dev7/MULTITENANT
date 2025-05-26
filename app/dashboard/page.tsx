"use client"

import { useState, useEffect } from "react"
import type { Tenant } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Settings, Eye, Trash2, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [initializing, setInitializing] = useState(false)

  useEffect(() => {
    fetchTenants()
  }, [])

  const fetchTenants = async () => {
    try {
      const response = await fetch("/api/tenants")
      const data = await response.json()
      setTenants(data)
    } catch (error) {
      console.error("Failed to fetch tenants:", error)
    } finally {
      setLoading(false)
    }
  }

  const initializeDemo = async () => {
    setInitializing(true)
    try {
      const response = await fetch("/api/init-db", { method: "POST" })
      const result = await response.json()
      if (result.success) {
        await fetchTenants()
        alert("Demo data initialized successfully!")
      } else {
        alert(result.error || "Failed to initialize demo data")
      }
    } catch (error) {
      alert("Failed to initialize demo data")
    } finally {
      setInitializing(false)
    }
  }

  const deleteTenant = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tenant?")) return

    try {
      await fetch(`/api/tenants/${id}`, { method: "DELETE" })
      setTenants(tenants.filter((t) => t._id !== id))
    } catch (error) {
      console.error("Failed to delete tenant:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Multi-Tenant Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">Manage your tenants, components, and pages</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={fetchTenants}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Link href="/dashboard/tenants/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Tenant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/tenant/demo">
              <Button variant="outline" size="sm">
                View Demo Site
              </Button>
            </Link>
            <Link href="/tenant/techstart">
              <Button variant="outline" size="sm">
                View TechStart
              </Button>
            </Link>
            <Link href="/tenant/creative">
              <Button variant="outline" size="sm">
                View Creative
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={initializeDemo} disabled={initializing}>
              {initializing ? "Initializing..." : "Load Demo Data"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tenants.map((tenant) => (
            <Card key={tenant._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{tenant.name}</CardTitle>
                  <Badge variant={tenant.isActive ? "default" : "secondary"}>
                    {tenant.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardDescription>{tenant.domain || tenant.subdomain}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>Components: {tenant.components?.length || 0}</p>
                  <p>Pages: {tenant.pages?.length || 0}</p>
                  <div className="flex items-center space-x-2">
                    <span>Theme:</span>
                    <div
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: tenant.theme?.primaryColor || "#gray" }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link href={`/dashboard/tenants/${tenant._id}`}>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Manage
                    </Button>
                  </Link>
                  <Link href={`/tenant/${tenant.subdomain || tenant.domain}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteTenant(tenant._id!)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {tenants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏢</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants yet</h3>
            <p className="text-gray-500 mb-4">Get started by loading demo data or creating your first tenant</p>
            <div className="flex justify-center space-x-4">
              <Button variant="secondary" onClick={initializeDemo} disabled={initializing}>
                {initializing ? "Loading..." : "Load Demo Data"}
              </Button>
              <Link href="/dashboard/tenants/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Tenant
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
