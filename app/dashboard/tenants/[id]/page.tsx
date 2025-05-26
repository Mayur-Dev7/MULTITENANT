"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import type { Tenant, ComponentConfig, ComponentVariant, PageConfig } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Trash2, Edit, Save, X } from "lucide-react"
import Link from "next/link"
import { componentVariants, componentTemplates } from "@/lib/component-templates"

export default function TenantManagement() {
  const params = useParams()
  const tenantId = params.id as string

  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingComponent, setEditingComponent] = useState<string | null>(null)
  const [editingPage, setEditingPage] = useState<string | null>(null)
  const [componentData, setComponentData] = useState<any>({})

  useEffect(() => {
    fetchTenant()
  }, [tenantId])

  const fetchTenant = async () => {
    try {
      const response = await fetch(`/api/tenants/${tenantId}`)
      const data = await response.json()
      setTenant(data)
    } catch (error) {
      console.error("Failed to fetch tenant:", error)
    } finally {
      setLoading(false)
    }
  }

  const addComponent = async (type: string, variant: string) => {
    if (!tenant) return

    const template = componentTemplates.find((t) => t.type === type && t.variant === variant)
    if (!template) return

    const newComponent: ComponentConfig = {
      id: `${type}_${variant}_${Date.now()}`,
      type: type as any,
      variant,
      name: `${template.name}`,
      isActive: true,
      data: template.defaultData,
      position: tenant.components.length,
    }

    const updatedComponents = [...tenant.components, newComponent]

    try {
      await fetch(`/api/tenants/${tenantId}/components`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ components: updatedComponents }),
      })

      setTenant({ ...tenant, components: updatedComponents })
    } catch (error) {
      console.error("Failed to add component:", error)
    }
  }

  const updateComponent = async (componentId: string, updates: Partial<ComponentConfig>) => {
    if (!tenant) return

    const updatedComponents = tenant.components.map((comp) =>
      comp.id === componentId ? { ...comp, ...updates } : comp,
    )

    try {
      await fetch(`/api/tenants/${tenantId}/components`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ components: updatedComponents }),
      })

      setTenant({ ...tenant, components: updatedComponents })
    } catch (error) {
      console.error("Failed to update component:", error)
    }
  }

  const saveComponentData = async (componentId: string) => {
    await updateComponent(componentId, { data: componentData })
    setEditingComponent(null)
    setComponentData({})
  }

  const addPage = async () => {
    if (!tenant) return

    const newPage: PageConfig = {
      id: `page_${Date.now()}`,
      name: "New Page",
      slug: `/page-${Date.now()}`,
      isActive: true,
      components: [],
      seoTitle: "New Page",
      seoDescription: "Page description",
    }

    const updatedPages = [...tenant.pages, newPage]

    try {
      await fetch(`/api/tenants/${tenantId}/pages`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages: updatedPages }),
      })

      setTenant({ ...tenant, pages: updatedPages })
    } catch (error) {
      console.error("Failed to add page:", error)
    }
  }

  const updatePage = async (pageId: string, updates: Partial<PageConfig>) => {
    if (!tenant) return

    const updatedPages = tenant.pages.map((page) => (page.id === pageId ? { ...page, ...updates } : page))

    try {
      await fetch(`/api/tenants/${tenantId}/pages`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages: updatedPages }),
      })

      setTenant({ ...tenant, pages: updatedPages })
    } catch (error) {
      console.error("Failed to update page:", error)
    }
  }

  const addComponentToPage = async (pageId: string, componentId: string) => {
    if (!tenant) return

    const page = tenant.pages.find((p) => p.id === pageId)
    if (!page) return

    const updatedComponents = [...page.components, componentId]
    await updatePage(pageId, { components: updatedComponents })
  }

  const removeComponentFromPage = async (pageId: string, componentId: string) => {
    if (!tenant) return

    const page = tenant.pages.find((p) => p.id === pageId)
    if (!page) return

    const updatedComponents = page.components.filter((id) => id !== componentId)
    await updatePage(pageId, { components: updatedComponents })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!tenant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Tenant not found</h2>
          <Link href="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-900">{tenant.name}</h1>
                <p className="text-sm text-gray-500">{tenant.domain || tenant.subdomain}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={tenant.isActive ? "default" : "secondary"}>
                {tenant.isActive ? "Active" : "Inactive"}
              </Badge>
              <Link href={`/tenant/${tenant.subdomain || tenant.domain}`}>
                <Button variant="outline">Preview Site</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="components" className="space-y-6">
          <TabsList>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Components</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Available Components */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Available Component Variants</h3>
                <div className="space-y-4">
                  {Object.entries(
                    componentVariants.reduce(
                      (acc, variant) => {
                        if (!acc[variant.type]) acc[variant.type] = []
                        acc[variant.type].push(variant)
                        return acc
                      },
                      {} as Record<string, ComponentVariant[]>,
                    ),
                  ).map(([type, variants]) => (
                    <Card key={type}>
                      <CardHeader>
                        <CardTitle className="capitalize">{type} Components</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {variants.map((variant) => (
                            <div key={variant.variant} className="flex justify-between items-center p-3 border rounded">
                              <div>
                                <h4 className="font-semibold">{variant.name}</h4>
                                <p className="text-sm text-gray-600">{variant.description}</p>
                                <p className="text-xs text-gray-500 mt-1">{variant.preview}</p>
                              </div>
                              <Button size="sm" onClick={() => addComponent(variant.type, variant.variant)}>
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Active Components */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Active Components</h3>
                <div className="space-y-3">
                  {tenant.components.map((component) => (
                    <Card key={component.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Switch
                                checked={component.isActive}
                                onCheckedChange={(checked) => updateComponent(component.id, { isActive: checked })}
                              />
                              <div>
                                <h4 className="font-semibold">{component.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {component.type} - {component.variant}
                                </p>
                              </div>
                            </div>

                            {editingComponent === component.id ? (
                              <div className="space-y-3 mt-4">
                                <div>
                                  <Label>Title</Label>
                                  <Input
                                    value={componentData.title || component.data.title || ""}
                                    onChange={(e) => setComponentData({ ...componentData, title: e.target.value })}
                                  />
                                </div>
                                {component.data.subtitle !== undefined && (
                                  <div>
                                    <Label>Subtitle</Label>
                                    <Input
                                      value={componentData.subtitle || component.data.subtitle || ""}
                                      onChange={(e) => setComponentData({ ...componentData, subtitle: e.target.value })}
                                    />
                                  </div>
                                )}
                                {component.data.description !== undefined && (
                                  <div>
                                    <Label>Description</Label>
                                    <textarea
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                      rows={3}
                                      value={componentData.description || component.data.description || ""}
                                      onChange={(e) =>
                                        setComponentData({ ...componentData, description: e.target.value })
                                      }
                                    />
                                  </div>
                                )}
                                {component.data.buttonText !== undefined && (
                                  <div>
                                    <Label>Button Text</Label>
                                    <Input
                                      value={componentData.buttonText || component.data.buttonText || ""}
                                      onChange={(e) =>
                                        setComponentData({ ...componentData, buttonText: e.target.value })
                                      }
                                    />
                                  </div>
                                )}
                                <div className="flex space-x-2">
                                  <Button size="sm" onClick={() => saveComponentData(component.id)}>
                                    <Save className="w-4 h-4 mr-1" />
                                    Save
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setEditingComponent(null)
                                      setComponentData({})
                                    }}
                                  >
                                    <X className="w-4 h-4 mr-1" />
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">Title: {component.data.title || "Not set"}</p>
                                {component.data.subtitle && (
                                  <p className="text-sm text-gray-600">Subtitle: {component.data.subtitle}</p>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingComponent(component.id)
                                setComponentData(component.data)
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updatedComponents = tenant.components.filter((c) => c.id !== component.id)
                                updateComponent(component.id, { isActive: false })
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {tenant.components.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No components added yet. Add some from the left panel.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pages">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Pages</h2>
                <Button onClick={addPage}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Page
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {tenant.pages.map((page) => (
                  <Card key={page.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{page.name}</CardTitle>
                          <CardDescription>{page.slug}</CardDescription>
                        </div>
                        <Badge variant={page.isActive ? "default" : "secondary"}>
                          {page.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {editingPage === page.id ? (
                        <div className="space-y-3">
                          <div>
                            <Label>Page Name</Label>
                            <Input value={page.name} onChange={(e) => updatePage(page.id, { name: e.target.value })} />
                          </div>
                          <div>
                            <Label>Slug</Label>
                            <Input value={page.slug} onChange={(e) => updatePage(page.id, { slug: e.target.value })} />
                          </div>
                          <Button size="sm" onClick={() => setEditingPage(null)}>
                            Done
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Components on this page:</h4>
                            <div className="space-y-2">
                              {page.components.map((componentId) => {
                                const component = tenant.components.find((c) => c.id === componentId)
                                return component ? (
                                  <div
                                    key={componentId}
                                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                                  >
                                    <span className="text-sm">{component.name}</span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeComponentFromPage(page.id, componentId)}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                ) : null
                              })}
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Add components:</h4>
                            <div className="space-y-1">
                              {tenant.components
                                .filter((c) => !page.components.includes(c.id))
                                .map((component) => (
                                  <div
                                    key={component.id}
                                    className="flex justify-between items-center p-2 border rounded"
                                  >
                                    <span className="text-sm">{component.name}</span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => addComponentToPage(page.id, component.id)}
                                    >
                                      Add
                                    </Button>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => setEditingPage(page.id)}>
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Switch
                              checked={page.isActive}
                              onCheckedChange={(checked) => updatePage(page.id, { isActive: checked })}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Tenant Settings</CardTitle>
                <CardDescription>Configure your tenant's appearance and behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Color</label>
                    <input
                      type="color"
                      value={tenant.theme.primaryColor}
                      onChange={(e) => {
                        const updatedTenant = {
                          ...tenant,
                          theme: { ...tenant.theme, primaryColor: e.target.value },
                        }
                        setTenant(updatedTenant)
                        // Auto-save theme changes
                        fetch(`/api/tenants/${tenantId}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ theme: updatedTenant.theme }),
                        })
                      }}
                      className="w-20 h-10 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary Color</label>
                    <input
                      type="color"
                      value={tenant.theme.secondaryColor}
                      onChange={(e) => {
                        const updatedTenant = {
                          ...tenant,
                          theme: { ...tenant.theme, secondaryColor: e.target.value },
                        }
                        setTenant(updatedTenant)
                        fetch(`/api/tenants/${tenantId}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ theme: updatedTenant.theme }),
                        })
                      }}
                      className="w-20 h-10 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Font Family</label>
                    <select
                      value={tenant.theme.fontFamily}
                      onChange={(e) => {
                        const updatedTenant = {
                          ...tenant,
                          theme: { ...tenant.theme, fontFamily: e.target.value },
                        }
                        setTenant(updatedTenant)
                        fetch(`/api/tenants/${tenantId}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ theme: updatedTenant.theme }),
                        })
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Lato">Lato</option>
                      <option value="Poppins">Poppins</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
