// components/ProductThreeSixty.jsx
'use client'
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const ThreeSixty = dynamic(() => import('react-360-view'), {
  ssr: false,
});


const ProductThreeSixty = () => {
  const [showIcon, setShowIcon] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcon(false)
    }, 5000) // hide after 3 seconds

    return () => clearTimeout(timer)
  }, [])


  return (
    <div className='relative bg-amber-400 w-full h-[80vh] '>
      <ThreeSixty
        amount={8}
        imagePath="https://res.cloudinary.com/dnrruxh6u/image/upload/360/product_09"
        fileName="image_{index}.jpg"
      />
      {/* 360 Icon */}
      {showIcon && (
        <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm animate-fade">
          🔄 360° View
        </div>
      )}
    </div>
  );
};

export default ProductThreeSixty;
