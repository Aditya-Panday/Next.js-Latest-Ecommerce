import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabSection = ({ productData }) => {

    return (
        <Tabs defaultValue="specifications" className="mb-16">
            <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
                <p className="text-gray-600">{productData?.description}</p>
            </TabsContent>

            <TabsContent value="specifications" className="mt-4">
                <table className="w-full text-left">
                    <tbody>
                        <tr className="border-b">
                            <td className="py-2 font-medium">Product Name</td>
                            <td className="py-2 text-gray-600">
                                {productData?.product_name}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 font-medium">Description</td>
                            <td className="py-2 text-gray-600">{productData?.description}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 font-medium">Brand Name</td>
                            <td className="py-2 text-gray-600">{productData?.brand_name}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 font-medium">Category</td>
                            <td className="py-2 text-gray-600">{productData?.category_name}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 font-medium">Sizes</td>
                            <td className="py-2 text-gray-600 flex flex-wrap gap-2">
                                {productData?.sizes?.map((size, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
                                    >
                                        {size}
                                    </span>
                                ))}
                            </td>
                        </tr>

                    </tbody>
                </table>
            </TabsContent>
        </Tabs>

    );
};

export default TabSection;
