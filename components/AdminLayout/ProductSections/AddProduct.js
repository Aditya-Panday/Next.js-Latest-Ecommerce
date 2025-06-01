"use client";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, Plus, Trash, Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  allowedTypes,
  categoryOptions,
  folderStructure,
} from "@/lib/constants/constantFunc";
import { FileUpload } from "@/utils/aws/awsUpload";
import { ToastContainer, toast } from 'react-toastify';
import CircleLoder from "@/components/CircleLoder";


export default function AddProduct({
  createData,
  isCreateDataLoading,
  formState,
  setFormState,
  sizes,
  handleSizeSelect,
  handleRemoveColor,
  handleSubmit,
  isLoadingData,
  clearImages
}) {

  const [sizeOpen, setSizeOpen] = useState(false);
  const [colorInput, setColorInput] = useState("");

  // Image upload state
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle image removal
  const handleRemoveImage = (index) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleAddColor = () => {
    if (colorInput.trim() && !formState.colors.includes(colorInput.trim())) {
      setFormState((prev) => ({
        ...prev,
        colors: [...prev.colors, colorInput.trim()],
      }));
    }
    setColorInput("");
  };

  const uploadImages = async (images) => {
    const keyFilePath =
      process.env.NEXT_PUBLIC_AWS_GBP_FOLDER + folderStructure();
    const imagesToUpload = images.filter((file) => !file.status);

    if (imagesToUpload.length === 0) {
      toast.error(`Please select images...`, {
        autoClose: 1500,
      });
      return;
    }

    try {
      setUploading(true);
      toast.info(`Wait for a moment files are uploading..`, {
        autoClose: 1500,
      });
      const uploadedKey = await FileUpload(imagesToUpload, keyFilePath);
      if (uploadedKey) {
        toast.success("Image uploaded successfully.", {
          autoClose: 1500,
        });
      }

      setFormState((prevState) => ({
        ...prevState,
        image_url: [
          ...(prevState.image_url || []),
          ...(Array.isArray(uploadedKey)    // Check if uploadedKey is an array (multiple images)
            ? uploadedKey.map((item) => item.location)
            : [uploadedKey.location]),
        ],
      }));
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setUploading(false);
    }
  };


  const handleImageSelect = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    const totalFiles = images.length + selectedFiles.length;
    if (totalFiles > 5) {
      toast.error("You can only upload up to 5 images.", {
        autoClose: 1500,
      });
      return;
    }

    const newValidImages = [];

    selectedFiles.forEach((file) => {
      const isDuplicate = images.some(
        (img) => img.name === file.name && img.size === file.size
      );

      if (!allowedTypes.includes(file.type)) {
        toast.error(`Invalid File format.`, {
          autoClose: 1500,
        });
      } else if (isDuplicate) {
        toast.error(`Duplicate files included please select another file or change the file name.`, {
          autoClose: 1500,
        });
      } else {
        file.preview = URL.createObjectURL(file);
        file.progress = 0;
        file.status = false;
        newValidImages.push(file);
      }
    });

    if (newValidImages.length > 0) {
      setImages((prev) => [...prev, ...newValidImages]);
    }

    e.target.value = null; // reset input in case same file is selected again
  };

  const resetImages = () => {
    setImages([]);
  };

  // ✅ If clearImages prop exists, set it when component renders
  useEffect(() => {
    if (typeof clearImages === "function") {
      clearImages(resetImages);
    }
  }, [clearImages]);

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-2xl font-bold">Create Product</CardTitle>
          <CardDescription>Add a new Product.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">
                    Product Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="product-name"
                    placeholder="Enter product name"
                    value={formState.product_name}
                    disabled={isLoadingData}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        product_name: e.target.value,
                      })
                    }
                    required
                  />
                  {/* {formState?.errors?.sizes && !formState?.sizes && (
                    <p className="text-red-500">{formState.errors.sizes}</p>
                  )} */}
                  <p className="text-red-500">
                    {formState.errors.product_name}
                  </p>

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">
                    Brand <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formState.brand_name}
                    onValueChange={(value) =>
                      setFormState({ ...formState, brand_name: value })
                    }
                    required
                    disabled={isCreateDataLoading || isLoadingData}

                  >
                    <SelectTrigger id="brand">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {createData?.brands.map((brand, index) => (
                        <SelectItem key={index} value={brand.name}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-red-500">
                    {formState?.errors.brand_name}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    Subcategory <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formState.sub_category}
                    onValueChange={(value) => {
                      setFormState({ ...formState, sub_category: value });
                    }}
                    disabled={isCreateDataLoading || isLoadingData}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {createData?.subCategories.map((sub, index) => (
                        <SelectItem key={index} value={sub.name}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-red-500">
                    {formState?.errors.sub_category}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subcategory">Category</Label>
                  <Select
                    value={formState.category_name}
                    disabled={isLoadingData}
                    onValueChange={(value) =>
                      setFormState({ ...formState, category_name: value })
                    }
                  >
                    <SelectTrigger id="subcategory">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category, index) => (
                        <SelectItem
                          key={`${category}-${index}`}
                          value={category}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-red-500">
                    {formState?.errors.category_name}
                  </p>
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-medium">Variants</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sizes */}
                <div className="space-y-2">
                  <Label>Sizes</Label>

                  <Popover open={sizeOpen} onOpenChange={setSizeOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={isLoadingData}
                        role="combobox"
                        aria-expanded={sizeOpen}
                        className="w-full justify-between h-10"
                      >
                        {formState.sizes?.length > 0
                          ? `${formState.sizes.length} size${formState.sizes.length > 1 ? "s" : ""
                          } selected`
                          : "Select sizes"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search size..." />
                        <CommandList>
                          <CommandEmpty>No size found.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-auto">
                            {sizes.map((size) => (
                              <CommandItem
                                key={size.value}
                                value={size.value}
                                onSelect={() => handleSizeSelect(size.value)}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${formState?.sizes?.includes(size.value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                    }`}
                                />
                                {size.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <p className="text-red-500">
                    {formState?.errors.sizes}
                  </p>

                  {formState.sizes?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formState.sizes.map((size) => (
                        <Badge
                          key={size}
                          variant="secondary"
                          className="px-2 py-1"
                        >
                          {sizes.find((s) => s.value === size)?.label || size}
                          <button
                            type="button"
                            onClick={() => handleSizeSelect(size)}
                            className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-primary"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {size}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                </div>

                {/* Colors */}
                <div className="space-y-2">
                  <Label htmlFor="color">Colors</Label>
                  <div className="flex gap-2">
                    <Input
                      id="color"
                      placeholder="Enter color"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddColor();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddColor}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {formState.colors?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formState.colors.map((color, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-2 py-1"
                        >
                          {color}
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(color)}
                            className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-primary"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {color}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-red-500">
                    {formState?.errors.colors}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                value={formState.description}
                onChange={(e) =>
                  setFormState({ ...formState, description: e.target.value })
                }
                className="min-h-32"
              />
              <p className="text-red-500">
                {formState?.errors.description}
              </p>
            </div>

            {/* Images */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-medium">Images</h3>

              <div className="grid grid-cols-1 gap-4">
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:bg-primary/5 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />

                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-10 w-10 text-primary/60" />
                    <h3 className="text-lg font-medium">Upload Images</h3>
                    <p className="text-sm text-muted-foreground">
                      You can select only 5 images.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Allowed Extensions: (webp, jpeg, jpg, avif, gif, png)
                    </p><p className="text-sm text-muted-foreground">
                      Drag and drop your images here or click to browse
                    </p>
                    <p className="text-red-500">
                      {formState?.errors.image_url}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Select Images ({images.length}/5)
                    </Button>

                    {images.length > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="p-4"
                        disabled={uploading}
                        onClick={() => uploadImages(images)}
                      >
                        {uploading ? <CircleLoder /> : "Upload Images "}
                      </Button>
                    )}
                  </div>
                </div>


                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border">
                          <Image
                            src={image.preview || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-background/80 rounded-full p-1 "
                        >
                          <Trash className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Remove image</span>
                        </button>
                        {/* Progress Indicator */}
                        {image.progress !== undefined && (
                          <div className="absolute bottom-1 left-1 right-1 bg-gray-300 rounded-full overflow-hidden h-4">
                            <div
                              style={{ width: `${image.progress}%` }}
                              className={`h-full ${image.progress === 100
                                ? "bg-green-500"
                                : "bg-blue-500"
                                } transition-all duration-300`}
                            >
                              <span
                                className={`text-xs px-4 py-1 ${image.progress > 0
                                  ? "text-gray-500"
                                  : "text-black"
                                  }`}
                              >
                                {image.progress}%
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Pricing */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-medium">Pricing</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Price <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0"
                    value={formState.price}
                    onChange={(e) =>
                      setFormState({ ...formState, price: e.target.value })
                    }
                  />
                  <p className="text-red-500">
                    {formState?.errors.price}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="100"
                    value={formState.discount}
                    onChange={(e) =>
                      setFormState({ ...formState, discount: e.target.value })
                    }
                  />
                  <p className="text-red-500">
                    {formState?.errors.discount}
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex gap-10">

              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-medium">Status</h3>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="product-status" // ✅ unique ID
                    checked={formState.status === "1"}
                    onCheckedChange={(checked) =>
                      setFormState({ ...formState, status: checked ? "1" : "0" })
                    }
                  />
                  <Label htmlFor="product-status">
                    {formState.status === "1" ? "Active" : "Inactive"}
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formState.status === "1"
                    ? "Product will be visible to customers."
                    : "Product will be hidden from customers."}
                </p>
                <p className="text-red-500">{formState?.errors?.status}</p>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-medium">Stock Status</h3> {/* ✅ Better heading */}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="product-stock" // ✅ unique ID
                    checked={formState.stock === "1"}
                    onCheckedChange={(checked) =>
                      setFormState({ ...formState, stock: checked ? "1" : "0" })
                    }
                  />
                  <Label htmlFor="product-stock">
                    {formState.stock === "1" ? "In Stock" : "Out of Stock"}
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formState.stock === "1"
                    ? "Product is available in stock."
                    : "Product is currently out of stock."}
                </p>
                <p className="text-red-500">{formState?.errors?.stock}</p>
              </div>

            </div>
          </CardContent>

          <CardFooter className="flex justify-end border-t bg-muted/10 p-6">
            <Button onClick={(e) => handleSubmit(e)}>Save Product</Button>
          </CardFooter>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
}