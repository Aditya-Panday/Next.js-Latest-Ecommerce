import { z } from "zod";

export const sizesEnum = ["XS", "S", "M", "L", "XL", "XXL"];
export const categoryOptions = ["Male", "Female", "Kids"];

export const productSchema = z.object({
  product_name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." })
    .max(80, { message: "Product name must be at most 80 characters." }),
  description: z
    .string()
    .min(10, { message: "Description should be at least 10 characters." }),
  price: z.number().positive({ message: "Price must be a number." }),
  discount: z
    .number()
    .min(0, { message: "Discount must be at least 0%." })
    .max(100, { message: "Discount must be at most 100%." }),
  brand_name: z
    .string()
    .min(2, { message: "Brand name must be at least 2 characters." }),
  image_url: z.string().url({ message: "Invalid image URL format." }),
  category_name: z.enum(["Male", "Female", "Kids"], {
    message: "Category name must be either 'Male', 'Female', or 'Kids'.",
  }),
  sub_category: z.string().min(2, { message: "Sub-category is required." }),
  sizes: z
    .array(z.enum(sizesEnum), {
      message: "Invalid size. Allowed sizes: XS, S, M, L, XL, XXL",
    })
    .min(1, { message: "At least one size is required." }),
  colors: z.array(
    z.string().min(1, { message: "Color must be at least one character." })
  ),
  status: z.boolean(),
});

export const folderStructure = () => {
  let folderName = "";
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; // Month is zero-based, so add 1
  //let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  folderName = year + "/" + month + "/";
  return folderName;
};

export const allowedTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/avif', 'image/gif', 'image/png'];
