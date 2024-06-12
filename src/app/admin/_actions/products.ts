"use server"
import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"



const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
)
const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().int().min(1),
  // file: z.optional(fileSchema
  //   // .refine(file => file.size > 0, "Required")
  // ),
  // image: z.optional(
  //   imageSchema
  //   // .refine(file => file.size > 0, "Required")
  // ),
})
  

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  console.log(result.error, "result")
    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }
  
    const data = result.data
    console.log(data, result, "ddss")
  
    // await fs.mkdir("products", { recursive: true })
    // const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    // await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
  
    // await fs.mkdir("public/products", { recursive: true })
    // const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    // await fs.writeFile(
    //   `public${imagePath}`,
    //   Buffer.from(await data.image.arrayBuffer())
    // )
  
    await db.product.create({
      data: {
        isAvailableForPurchase: false,
        name: data.name,
        description: data.description,
        price: data.price,
      },
    })
  
    revalidatePath("/")
    revalidatePath("/products")
  
    redirect("/admin/products")
  }


export async function updateProduct(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }
  
    const data = result.data
    console.log(data)
  
    // await fs.mkdir("products", { recursive: true })
    // const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    // await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
  
    // await fs.mkdir("public/products", { recursive: true })
    // const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    // await fs.writeFile(
    //   `public${imagePath}`,
    //   Buffer.from(await data.image.arrayBuffer())
    // )
  
    // await db.product.create({
    //   data: {
    //     isAvailableForPurchase: false,
    //     name: data.name,
    //     description: data.description,
    //     price: data.price,
    //     filePath,
    //     imagePath,
    //   },
    // })
  
    revalidatePath("/")
    revalidatePath("/products")
  
    redirect("/admin/products")
  }

  export async function deleteProduct(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }
  
    const data = result.data
    console.log(data)
  
    // await fs.mkdir("products", { recursive: true })
    // const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    // await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
  
    // await fs.mkdir("public/products", { recursive: true })
    // const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    // await fs.writeFile(
    //   `public${imagePath}`,
    //   Buffer.from(await data.image.arrayBuffer())
    // )
  
    // await db.product.create({
    //   data: {
    //     isAvailableForPurchase: false,
    //     name: data.name,
    //     description: data.description,
    //     price: data.price,
    //     filePath,
    //     imagePath,
    //   },
    // })
  
    revalidatePath("/")
    revalidatePath("/products")
  
    redirect("/admin/products")
  }