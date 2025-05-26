export interface Tenant {
  _id?: string
  name: string
  domain: string
  subdomain: string
  isActive: boolean
  theme: {
    primaryColor: string
    secondaryColor: string
    fontFamily: string
  }
  components: ComponentConfig[]
  pages: PageConfig[]
  createdAt?: Date
  updatedAt?: Date
}

export interface ComponentConfig {
  id: string
  type: "navbar" | "hero" | "features" | "footer" | "contact" | "about"
  variant: string // New: which UI variant to use
  name: string
  isActive: boolean
  data: {
    title?: string
    subtitle?: string
    description?: string
    buttonText?: string
    buttonLink?: string
    image?: string
    icon?: string
    items?: any[]
    links?: { name: string; href: string }[]
    [key: string]: any
  }
  position: number
}

export interface PageConfig {
  id: string
  name: string
  slug: string
  isActive: boolean
  components: string[] // Component IDs
  seoTitle?: string
  seoDescription?: string
}

export interface ComponentTemplate {
  type: string
  variant: string
  name: string
  description: string
  defaultData: any
  fields: FormField[]
}

export interface FormField {
  name: string
  label: string
  type: "text" | "textarea" | "url" | "color" | "number" | "array" | "select"
  required?: boolean
  placeholder?: string
  options?: string[]
}

export interface ComponentVariant {
  type: string
  variant: string
  name: string
  description: string
  preview?: string
}
