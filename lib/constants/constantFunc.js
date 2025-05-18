
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

export const allowedTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/avif', 'image/gif', 'image/png'];
