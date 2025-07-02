// @ts-nocheck
import ProductDetailView from '@/components/products/ProductDetailView'
import React from 'react'

export default function page({ params })  {
  const {slug} = params
    return (
     <ProductDetailView slug={slug} />
    )
  }