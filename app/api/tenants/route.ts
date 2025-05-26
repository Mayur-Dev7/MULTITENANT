import { type NextRequest, NextResponse } from "next/server"
import { tenantService } from "@/lib/tenant-service"

export async function GET() {
  try {
    const tenants = await tenantService.getAllTenants()
    return NextResponse.json(tenants)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tenants" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const tenant = await tenantService.createTenant(body)
    return NextResponse.json(tenant, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create tenant" }, { status: 500 })
  }
}
