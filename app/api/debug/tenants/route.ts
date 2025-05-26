import { NextResponse } from "next/server"
import { tenantService } from "@/lib/tenant-service"

export async function GET() {
  try {
    const tenants = await tenantService.getAllTenants()

    return NextResponse.json({
      success: true,
      count: tenants.length,
      tenants: tenants.map((tenant) => ({
        id: tenant._id,
        name: tenant.name,
        domain: tenant.domain,
        subdomain: tenant.subdomain,
        isActive: tenant.isActive,
        componentsCount: tenant.components?.length || 0,
      })),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
