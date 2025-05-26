import type React from "react"
import type { Metadata } from "next"
import { tenantService } from "@/lib/tenant-service"

interface TenantLayoutProps {
  children: React.ReactNode
  params: {
    domain: string
  }
}

export async function generateMetadata({ params }: TenantLayoutProps): Promise<Metadata> {
  const tenant = await tenantService.getTenantByDomain(params.domain)

  if (!tenant) {
    return {
      title: "Tenant Not Found",
      description: "The requested tenant could not be found.",
    }
  }

  const homePage = tenant.pages.find((page) => page.slug === "/")

  return {
    title: homePage?.seoTitle || `${tenant.name} - Welcome`,
    description: homePage?.seoDescription || `Welcome to ${tenant.name}`,
    other: {
      "theme-color": tenant.theme.primaryColor,
    },
  }
}

export default function TenantLayout({ children }: TenantLayoutProps) {
  return <>{children}</>
}
