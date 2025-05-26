"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h2 className="text-xl font-bold text-gray-900">Multi-Tenant Platform</h2>
            <div className="flex space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link href="/tenant/demo">
                <Button variant="outline">Demo Site</Button>
              </Link>
              <Link href="/tenant/techstart">
                <Button variant="outline">TechStart</Button>
              </Link>
              <Link href="/tenant/creative">
                <Button variant="outline">Creative</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Multi-Tenant Platform</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Build and manage multiple websites with a powerful dashboard. Create tenants, customize components, and
            deploy instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="px-8 py-3">
                Access Dashboard
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="lg"
              className="px-8 py-3"
              onClick={async () => {
                try {
                  const response = await fetch("/api/init-db", { method: "POST" })
                  const result = await response.json()
                  alert(result.message || result.error)
                  if (result.success) {
                    window.location.reload()
                  }
                } catch (error) {
                  alert("Failed to initialize database")
                }
              }}
            >
              Initialize Demo Data
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                🏢 <span className="ml-2">Demo Corp</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Full-featured demo site with all components</CardDescription>
              <Link href="/tenant/demo">
                <Button className="w-full">View Demo Site</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                🚀 <span className="ml-2">TechStart</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Tech company example with green theme</CardDescription>
              <Link href="/tenant/techstart">
                <Button className="w-full">View TechStart</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                🎨 <span className="ml-2">Creative Studio</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Design agency with purple theme</CardDescription>
              <Link href="/tenant/creative">
                <Button className="w-full">View Creative</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Platform Features</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Multi-Tenant Architecture</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Separate sites per tenant</li>
                <li>✅ Custom domains and subdomains</li>
                <li>✅ Isolated configurations</li>
                <li>✅ Shared component library</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Dashboard Control</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Add/remove components</li>
                <li>✅ Customize themes and colors</li>
                <li>✅ Manage content and data</li>
                <li>✅ Real-time preview</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
