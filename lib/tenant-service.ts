import { getDatabase } from "./mongodb"
import type { Tenant, ComponentConfig, PageConfig } from "@/types"

export class TenantService {
  private async getDb() {
    return await getDatabase()
  }

  async getAllTenants(): Promise<Tenant[]> {
    try {
      const db = await this.getDb()
      const tenants = await db.collection("tenants").find({}).toArray()
      return tenants.map((tenant) => ({
        ...tenant,
        _id: tenant._id.toString(),
        components: tenant.components || [],
        pages: tenant.pages || [],
      }))
    } catch (error) {
      console.error("Error fetching tenants:", error)
      return []
    }
  }

  async getTenantByDomain(domain: string): Promise<Tenant | null> {
    try {
      const db = await this.getDb()
      const tenant = await db.collection("tenants").findOne({
        $or: [{ domain }, { subdomain: domain }],
      })

      if (!tenant) return null

      return {
        ...tenant,
        _id: tenant._id.toString(),
        components: tenant.components || [],
        pages: tenant.pages || [],
      }
    } catch (error) {
      console.error("Error fetching tenant by domain:", error)
      return null
    }
  }

  async getTenantById(id: string): Promise<Tenant | null> {
    try {
      const db = await this.getDb()
      const { ObjectId } = require("mongodb")
      const tenant = await db.collection("tenants").findOne({ _id: new ObjectId(id) })

      if (!tenant) return null

      return {
        ...tenant,
        _id: tenant._id.toString(),
        components: tenant.components || [],
        pages: tenant.pages || [],
      }
    } catch (error) {
      console.error("Error fetching tenant by ID:", error)
      return null
    }
  }

  async createTenant(tenant: Omit<Tenant, "_id">): Promise<Tenant> {
    const db = await this.getDb()
    const result = await db.collection("tenants").insertOne({
      ...tenant,
      components: tenant.components || [],
      pages: tenant.pages || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { ...tenant, _id: result.insertedId.toString() }
  }

  async updateTenant(id: string, updates: Partial<Tenant>): Promise<boolean> {
    try {
      const db = await this.getDb()
      const { ObjectId } = require("mongodb")
      const result = await db
        .collection("tenants")
        .updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } })
      return result.modifiedCount > 0
    } catch (error) {
      console.error("Error updating tenant:", error)
      return false
    }
  }

  async deleteTenant(id: string): Promise<boolean> {
    try {
      const db = await this.getDb()
      const { ObjectId } = require("mongodb")
      const result = await db.collection("tenants").deleteOne({ _id: new ObjectId(id) })
      return result.deletedCount > 0
    } catch (error) {
      console.error("Error deleting tenant:", error)
      return false
    }
  }

  async updateTenantComponents(tenantId: string, components: ComponentConfig[]): Promise<boolean> {
    return this.updateTenant(tenantId, { components })
  }

  async updateTenantPages(tenantId: string, pages: PageConfig[]): Promise<boolean> {
    return this.updateTenant(tenantId, { pages })
  }
}

export const tenantService = new TenantService()
