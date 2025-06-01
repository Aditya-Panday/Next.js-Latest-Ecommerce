import Cookies from "js-cookie";

export const sizesEnum = ["XS", "S", "M", "L", "XL", "XXL"];
export const categoryOptions = ["Male", "Female", "Kids"];

export const folderStructure = () => {
  let folderName = "";
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; // Month is zero-based, so add 1
  //let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  folderName = year + "/" + month + "/";
  return folderName;
};

// export const updateCart  = (product, action = "add") => {
//   console.log("product", product);
//   const cookieName = "cart";
//   // Get existing cart from cookies
//   const existingCart = JSON.parse(Cookies.get(cookieName) || "[]");
//   console.log("existingCart", existingCart);
//   // Check if product with same id, name, and size already exists
//   const existingIndex = existingCart.findIndex(
//     (item) =>
//       item.id === product.id &&
//       item.name === product.name &&
//       item.size === product.size
//   );
//   console.log("existingIndex", existingIndex);
//   if (action === "add") {
//     if (existingIndex !== -1) {
//       existingCart[existingIndex].quantity += product.quantity || 1;
//     } else {
//       existingCart.push({
//         ...product,
//         quantity: product.quantity || 1,
//       });
//     }
//   }
//   else if (action === "decrease") {
//     if (existingIndex !== -1) {
//       if (existingCart[existingIndex].quantity > 1) {
//         existingCart[existingIndex].quantity -= 1;
//       } else {
//         // Remove if quantity goes below 1
//         existingCart.splice(existingIndex, 1);
//       }
//     }
//   }
//   else if (action === "remove") {
//     if (existingIndex !== -1) {
//       existingCart.splice(existingIndex, 1);
//     }
//   }


//   // Save back to cookie
//   Cookies.set(cookieName, JSON.stringify(existingCart), { expires: 2 }); // expires in 7 days
// };
export const handleCookies = ()=>{
  const existingCart = JSON.parse(Cookies.get("cart") || "[]");
return existingCart;
}

export const allowedTypes = [
  "image/webp",
  "image/jpeg",
  "image/jpg",
  "image/avif",
  "image/gif",
  "image/png",
];
