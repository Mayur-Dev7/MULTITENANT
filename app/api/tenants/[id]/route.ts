import { type NextRequest, NextResponse } from "next/server"
import { tenantService } from "@/lib/tenant-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tenant = await tenantService.getTenantById(params.id)
    if (!tenant) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
    }
    return NextResponse.json(tenant)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tenant" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const success = await tenantService.updateTenant(params.id, body)
    if (!success) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update tenant" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await tenantService.deleteTenant(params.id)
    if (!success) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete tenant" }, { status: 500 })
  }
}
