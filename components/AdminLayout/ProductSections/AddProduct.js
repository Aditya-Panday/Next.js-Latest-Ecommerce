"use client";

import { useState, useRef } from "react";
import {
  Check,
  ChevronsUpDown,
  // Loader2,
  Plus,
  Trash,
  Upload,
  X,
} from "lucide-react";
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
import { categoryOptions, folderStructure } from "@/lib/constants/constantFunc";
import { ChunkUpload } from "@/lib/constants/aws-function/UploadChunk";
import { useS3MultipartUploadMutation } from "@/lib/features/s3Api/s3Slice";

export default function AddProduct({
  createData,
  isCreateDataLoading,
  formState,
  setFormState,
  sizes,
  handleSizeSelect,
  handleAddColor,
  handleRemoveColor,
  handleSubmit,
}) {
  const [sizeOpen, setSizeOpen] = useState(false);
  const [colorInput, setColorInput] = useState("");

  // Image upload state
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  // console.log("imagesdata", images);

  const [s3MultipartUpload] = useS3MultipartUploadMutation();

  // Handle image removal
  const handleRemoveImage = (index) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const uploadImages = async (images) => {
    const keyFilePath =
      process.env.NEXT_PUBLIC_AWS_GBP_FOLDER + folderStructure();

    const uploadedKey = await ChunkUpload(
      images,
      keyFilePath,
      s3MultipartUpload
    );
    console.log("uploadedKey", uploadedKey);
    setFormState({ ...formState, image_url: uploadedKey });
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
      }));

      setImages((prev) => [...prev, ...newImages]);
    }
  };

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
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        product_name: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Enter SKU" />
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
                    disabled={isCreateDataLoading}
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
                    disabled={isCreateDataLoading}
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subcategory">Category</Label>
                  <Select
                    value={formState.category_name}
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
                        role="combobox"
                        aria-expanded={sizeOpen}
                        className="w-full justify-between h-10"
                      >
                        {formState.sizes?.length > 0
                          ? `${formState.sizes.length} size${
                              formState.sizes.length > 1 ? "s" : ""
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
                                  className={`mr-2 h-4 w-4 ${
                                    formState?.sizes?.includes(size.value)
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
                      Drag and drop your images here or click to browse
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Select Images
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => uploadImages(images)}
                    >
                      Upload Images
                    </Button>
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
                              className={`h-full ${
                                image.progress === 100
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                              } transition-all duration-300`}
                            >
                              <span className="text-xs text-white font-semibold p-4">
                                {10}%
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
                    placeholder="0.00"
                    value={formState.price}
                    onChange={(e) =>
                      setFormState({ ...formState, price: e.target.value })
                    }
                    required
                  />
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
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-medium">Status</h3>

              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formState.status}
                  onCheckedChange={(checked) =>
                    setFormState({ ...formState, status: checked ? 1 : 0 })
                  }
                />
                <Label htmlFor="status">
                  {formState.status == 1 ? "Active" : "Inactive"}
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                {formState.status == 1
                  ? "Product will be visible to customers"
                  : "Product will be hidden from customers"}
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end border-t bg-muted/10 p-6">
            <Button type="submit">Save Product</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
