import ProductDetailView from '@/components/products/ProductDetailView'
import React from 'react'

export default function page({ params }: { params: { slug: string } }) {
    return (
     <ProductDetailView slug={params.slug} />
    )
  }