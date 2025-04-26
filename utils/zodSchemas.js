import { sizesEnum } from "@/lib/constants/constantFunc";
import { z } from "zod";

export const productSchema = z.object({
  product_name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." })
    .max(80, { message: "Product name must be at most 80 characters." }),
  description: z
    .string()
    .min(10, { message: "Description should be at least 10 characters." }),
  price: z.coerce.number()
    .positive({ message: "Price must be a positive number." })
    .min(100, { message: "Price must be at least 100." }),
  //z.coerce.number() This will automatically convert a string (like "123") to a number before validation. 
  discount: z.coerce.number()
    .min(0, { message: "Discount must be at least 0%." })
    .max(100, { message: "Discount must be at most 100%." }),
  brand_name: z
    .string()
    .min(2, { message: "Brand name must be at least 2 characters." }),
  image_url: z
    .array(z.string().url({ message: "Invalid image URL format." }))
    .min(1, { message: "At least one image URL is required." })
    .max(5, { message: "You can provide a maximum of 5 image URLs." }),
  category_name: z.enum(["Male", "Female", "Kids"], {
    message: "Category name must be either 'Male', 'Female', or 'Kids'.",
  }),
  sub_category: z.string().min(2, { message: "Sub-category is required." }),
  sizes: z
    .array(z.enum(sizesEnum), {
      message: "Invalid size. Allowed sizes: XS, S, M, L, XL, XXL",
    })
    .min(1, { message: "At least one size is required." }),
  colors: z
    .array(z.string().min(1, { message: "Color must be at least one character." }))
    .min(1, { message: "At least one color is required." }),
  status: z.enum(["0", "1"], {
    invalid_type_error: "Status must be either '0' or '1'.",
  }),
  stock: z.enum(["0", "1"], {
    invalid_type_error: "Stock must be either '0' or '1'.",
  }),

});