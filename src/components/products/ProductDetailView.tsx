'use client'
import React, { useEffect, useState } from 'react'
import ProductThreeSixty from '../productView/ProductThreeSixty';
import { apiServices } from '@/service/apiService';
import { Product } from '@/type/productType';



const ProductDetailView = ({slug}:{slug:string}) => {
    console.log(slug,'slug')

    const getProducts = async () => {
        const response = await apiServices().getProducts()
        console.log(response.data, 'ress')
        if (response.status === 200) {
            setProduct(response?.data[0])
        }
    }
    useEffect(() => {
        getProducts()
    }, [])

    const [product, setProduct] = useState<Product | null>(null)

    console.log(product, 'product')


    return (
        <div className="max-w-6xl mx-auto px-4 py-6 text-gray-800">
            {/* Product Main Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side: Image Gallery */}
                <div>
                    <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {product?.images ? (
                            <img
                                src={product?.images[0]}
                                alt="Selected"
                                className="object-contain h-full w-full"
                            />
                        ) : (
                            <span className="text-gray-400">No image</span>
                        )}
                    </div>
                    <ProductThreeSixty />
                    <div className="mt-4 flex flex-wrap gap-3">
                        {product?.images?.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Thumb-${i}`}
                                // onClick={() => setSelectedImage(img)}
                                // className={`w-16 h-16 object-cover rounded border cursor-pointer ${
                                //   selectedImage === img ? 'ring-2 ring-blue-400' : ''
                                // }`}
                                className={`w-16 h-16 object-cover rounded border cursor-pointer `}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Side: Product Info */}
                <div className="flex flex-col space-y-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">{product?.name}</h1>
                    <p className="text-sm text-gray-500">{product?.category}</p>

                    <div className="text-xl font-bold text-green-700">
                        ₹{product?.discountedPrice || product?.price}
                        {product?.discountedPrice && (
                            <span className="text-gray-400 line-through text-sm ml-2">
                                ₹{product?.price}
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600">{product?.description}</p>

                    <div>
                        <h4 className="font-semibold mb-1">Sizes:</h4>
                        <div className="flex gap-2 flex-wrap">
                            {product?.sizes?.map((size) => (
                                <span
                                    key={size}
                                    className="border px-3 py-1 rounded text-sm bg-white hover:bg-gray-100"
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-1">Colors:</h4>
                        <div className="flex gap-2">
                            {product?.colors?.map((color, i) => (
                                <div
                                    key={i}
                                    className="w-6 h-6 rounded-full border"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="text-sm text-gray-700">
                        <strong>Status:</strong>{' '}
                        {product?.inStock ? (
                            <span className="text-green-600">In Stock</span>
                        ) : (
                            <span className="text-red-500">Out of Stock</span>
                        )}
                    </div>

                    <button
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        disabled={!product?.inStock}
                    >
                        {product?.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>

            {/* 360 View */}
            {product?.image360 && product?.image360?.length > 0 ? (
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">360° View</h2>
                    <div className="flex overflow-x-auto gap-4">
                        {product.image360.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`360-${idx}`}
                                className="h-48 rounded object-contain bg-gray-100"
                            />
                        ))}
                    </div>
                </div>
            ):null}
        </div>
    );
}


export default ProductDetailView

