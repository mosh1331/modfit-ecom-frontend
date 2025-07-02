'use client';

import { useEffect, useState } from 'react';
import { apiServices } from '@/service/apiService';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/type/productType';
import ProductThreeSixty from '../productView/ProductThreeSixty'
import ModtifLoader from '../loader/ModtifLoader';


export default function ProductDetailPage({slug}:{slug:string}) {

  console.log(slug,'idddd')
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (slug) {
      apiServices()
        .getProductById(slug)
        .then((res: any) => {
          if (res?.status === 200) {
            setProduct(res.data);
          }
        });
    }
  }, [slug]);

  if (!product) return <ModtifLoader />;

  return (
    <div className="bg-white min-h-screen px-4 py-10 sm:px-6 lg:px-16">
      {/* Product Display */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image Viewer */}
        <div className="w-full lg:w-1/2">
          <div className="rounded border overflow-hidden mb-4">
            {product.images360 ? (
            //   <ThreeSixty
            //     amount={8}
            //     imagePath={'https://res.cloudinary.com/dnrruxh6u/image/upload/360/product_09'}
            //     fileName={`image_${index}.jpg`}
            //     width={500}
            //     height={500}
            //     spinReverse
            //     autoplay
            //   />
              <ProductThreeSixty images={product.images360} />
            ) : (
              <img
                src={product.images[0]}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full rounded"
              />
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumb ${i}`}
                width={100}
                height={100}
                className="rounded object-cover border hover:ring-2 hover:ring-black transition"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">{product.description}</p>

          {/* Pricing */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-semibold text-red-600">
              ${product.discountedPrice || product.price}
            </span>
            {product.discountedPrice && (
              <span className="line-through text-gray-400 text-sm sm:text-base">
                ${product.price}
              </span>
            )}
          </div>

          {/* Stock */}
          <p className="mt-2 text-sm text-gray-500">
            {/* {product.inStock > 0 ? `${product.inStock} pieces left` : 'Out of stock'} */}
          </p>

          {/* Add to Cart */}
          <button className="mt-6 w-full sm:w-auto bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
            Add to Cart
          </button>

          <p className="mt-4 text-sm text-gray-500">Category: {product.category}</p>
        </div>
      </div>

      {/* Combo Offers */}
      <div className="mt-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
          Combo Offers You’ll Love
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((combo) => (
            <div
              key={combo}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <Image
                  src="/images/product_01/image_01.jpg"
                  alt="Combo Product"
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <span className="text-xl font-semibold">+</span>
                <Image
                  src="/images/shawl.jpg"
                  alt="Shawl"
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Hoodie + Shawl Combo</h3>
              <p className="text-sm text-gray-500 mt-1">Perfect match for chilly days</p>
              <div className="mt-2 text-red-600 font-bold text-lg">$79.99</div>
              <Link href="/combo/hoodie-shawl" className="mt-3 inline-block text-sm text-blue-600 underline">
                View Combo
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
