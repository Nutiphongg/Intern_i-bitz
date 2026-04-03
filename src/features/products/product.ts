import { t,Static } from "elysia"

// 1. กำหนด Schema สำหรับการรับค่า

//Schema สำหรับค่า ID จาก URL
export const ProductIdParamSchema = t.Object({
    id: t.Numeric({desciption: 'รหัสสินค้า (ID)'})
});

export const CreateProductSchema = t.Object({
    product_name: t.String({description:'ชื่อสินค้า'}),
    price_day: t.Numeric({description:'ราคาต่อวัน'}),
    deposit_amount:t.Numeric({description:'ค่ามัดจำที่ต้องจ่าย'}),
    category_id:t.Numeric({description:'ID ของหมวดหมู่'})
});



export type IProductIDParam = Static<typeof ProductIdParamSchema>;
export type ICreatProduct = Static<typeof CreateProductSchema>;