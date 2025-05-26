import { type NextRequest, NextResponse } from "next/server"
import { tenantService } from "@/lib/tenant-service"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { components } = await request.json()
    const success = await tenantService.updateTenantComponents(params.id, components)
    if (!success) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update components" }, { status: 500 })
  }
}
