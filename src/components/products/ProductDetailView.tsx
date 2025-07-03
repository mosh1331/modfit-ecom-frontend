'use client';

import { useEffect, useState } from 'react';
import { apiServices } from '@/service/apiService';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/type/productType';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ModtifLoader from '../loader/ModtifLoader';

export default function ProductDetailPage({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      apiServices()
        .getProductById(slug)
        .then((res: any) => {
          if (res?.status === 200) {
            setProduct(res.data);
            setMainImage(res.data.images[0]); // Default main image
          }
        });
    }
  }, [slug]);

  if (!product) return <ModtifLoader />;

  return (
    <div className="bg-white min-h-screen px-4 py-10 sm:px-6 lg:px-16">
      {/* Product Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image Viewer */}
        <div className="w-full lg:w-1/2">
          {/* Main Image with Zoom */}
          <div className="border rounded overflow-hidden h-[400px] sm:h-[500px] mb-4 flex items-center justify-center bg-gray-100">
            <Zoom>
              <img
                src={mainImage!}
                alt={product.name}
                width={600}
                height={600}
                className="object-contain w-auto h-full"
              />
            </Zoom>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`rounded border ${
                  mainImage === img ? 'ring-2 ring-black' : ''
                } overflow-hidden`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i}`}
                  width={100}
                  height={100}
                  className="object-cover w-full h-20 sm:h-24"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
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
          {/* {product.inStock !== undefined && (
            <p className="mt-2 text-sm text-gray-500">
              {product.inStock > 0 ? `${product.inStock} pieces left` : 'Out of stock'}
            </p>
          )} */}

          {/* Add to Cart */}
          <button className="mt-6 w-full sm:w-auto bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
            Add to Cart
          </button>

          <p className="mt-4 text-sm text-gray-500">Category: {product.category}</p>
        </div>
      </div>

      {/* Combo Offers */}
      <div className="mt-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Combo Offers You’ll Love</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(combo => (
            <div
              key={combo}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <img
                  src="/images/product_01/image_01.jpg"
                  alt="Combo Product"
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <span className="text-xl font-semibold">+</span>
                <img
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
              <Link
                href="/combo/hoodie-shawl"
                className="mt-3 inline-block text-sm text-blue-600 underline"
              >
                View Combo
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
