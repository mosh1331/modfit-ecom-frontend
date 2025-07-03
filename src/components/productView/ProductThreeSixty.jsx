// components/ProductThreeSixty.jsx
'use client'
import { getBaseCloudinaryUrl } from '@/utils/helper';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';

const ThreeSixty = dynamic(() => import('react-360-view'), {
  ssr: false,
});



const ProductThreeSixty = ({ images }) => {
  const [showIcon, setShowIcon] = useState(true)
  const viewerRef = useRef(null);

  const handleRotateLeft = () => {
    alert('step back')
    viewerRef.current?.stepBackward?.();
  };

  const handleRotateRight = () => {
    viewerRef.current?.stepForward?.();
  };

  const handleTogglePlay = () => {
    if (viewerRef.current?.togglePlay) {
      viewerRef.current.togglePlay();
    }
  };

  console.log(images[0], 'images 360')
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcon(false)
    }, 5000) // hide after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  const imagePath = images && images?.length > 0 ? getBaseCloudinaryUrl(images[0]) : null
  console.log(imagePath, 'imagePath')

  return (
    <div className="w-full">
      <div className='relative bg-white w-full h-[40vh] '>
        <ThreeSixty
          amount={8}
          imagePath={imagePath}
          // imagePath="https://res.cloudinary.com/dnrruxh6u/image/upload/360/Product_11"
          fileName="image_{index}.webp"
          buttonClass="dark"
        />
        {/* 360 Icon */}
        {showIcon && (
          <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm animate-fade">
            🔄 360° View
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4 mt-4 ">
        <button
          onClick={handleRotateLeft}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow"
          aria-label="Rotate Left"
        >
          ⬅️
        </button>
        <button
          onClick={handleTogglePlay}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow"
          aria-label="Play / Pause"
        >
          🔁
        </button>
        <button
          onClick={handleRotateRight}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow"
          aria-label="Rotate Right"
        >
          ➡️
        </button>
      </div>
    </div>

  );
};

export default ProductThreeSixty;
