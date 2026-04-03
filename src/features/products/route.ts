import { Elysia } from "elysia";
import { prisma } from "../../setup/db";
import { CreateProductSchema, ProductIdParamSchema } from "./product";



export const productRoutes = new Elysia({ prefix: '/api/products' })
  // API ดึงข้อมูลสินค้าทั้งหมด
  .get("/", async () => {
    const products = await prisma.product.findMany({
      select: {
        product_id     : true,
        product_name   : true,
        price_day      : true,
        deposit_amount : true,
        category_id    : true, 
        categories:{
            select:{
                category_name : true,
            }
        }// ดึงชื่อหมวดหมู่มาด้วย
      }
    });
    return products;
  }, {
    detail: {
      tags: ['Products'],
      summary: 'ดึงข้อมูลสินค้าทั้งหมด พร้อมหมวดหมู่'
    }
  })
  
  // API ดึงข้อมูลสินค้าตาม ID
  .get("/:id", async ({ params: { id } }) => {
    return await prisma.product.findUnique({
      where: { product_id:(id) }
    });
  }, {
    params: ProductIdParamSchema,
    detail: {
      tags: ['Products'],
      summary: 'ค้นหาสินค้าจาก ID'
    }
  })

  .post("/",async ({ body,set }) => {
    const newProduct = await prisma.product.create({
      data: {
        product_name: body.product_name,
        price_day: body.price_day,
        deposit_amount:body.deposit_amount,
        category_id:body.category_id
      }
    });

    set.status = 201;
    return {
      status: "success",
      message: "สร้างสินค้าสำเร็จ",
      product_id: newProduct.product_id
    };
  },{
    body: CreateProductSchema,
    detail: {
      tags:['Products'],
      summary: 'สร้างสินค้าใหม่'
    }
  })

  .delete("/:id", async ({ params }) => {
    await prisma.product.delete({
      where:{ product_id: params.id }
    });

    return {
      status: "success",
      message: `ลบข้อมูลสินค้ารหัส ${params.id} สำเร็จ`
    };
  },{
    params:ProductIdParamSchema,
    detail: {
      tags:['Products'],
      summary:'ลบข้อมูลสินค้าออกจากระบบ'
    }
  })