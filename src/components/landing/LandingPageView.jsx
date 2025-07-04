// LandingPage.jsx
'use client'
import React, { useEffect, useState } from 'react';
import { Mail, Star } from 'lucide-react';
import { apiServices } from '@/service/apiService';
import Loader from '../loader/Loader';
import Link from 'next/link';


const LandingPage = () => {
  const [session_id, setSessionId] = useState("dummy_session_test");

  const fetchData = async () => {
    // const data = { name: 'test user 1', email: 'test@gmail.com', password: 'test123' }
    const response = await apiServices().getProducts()
    // const response = await axios.post('http://localhost:5001/api/auth/register', data)
    console.log(response, 'response')

  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className="font-sans bg-white text-gray-900 relative">
      {/* HERO */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center p-8 md:p-20 gap-8 bg-gray-50">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Elegant Modest Wear for Every Occasion</h1>
          <p className="mb-6 text-lg text-gray-700">Experience our 360° view to explore every detail of your perfect look.</p>
          <Link href={`/products`}  className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800">Shop Collection</Link>
          <Link href={`/admin/product-manage/create`}  className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800">Create Product</Link>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg w-1/2">
          {/* <ProductThreeSixty /> */}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border p-4 rounded-xl hover:shadow-md transition">
              <img src={`/images/featured_${item}.jpg`} alt={`Product ${item}`} className="w-full h-64 object-cover rounded-md mb-4" />
              <h3 className="font-medium text-xl">Modest Dress {item}</h3>
              <p className="text-gray-600 mt-2">$49.99</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 bg-gray-100 px-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          We’re dedicated to offering stylish and elegant modest wear that empowers women to feel confident, comfortable, and beautiful in every setting.
        </p>
      </section>

      {/* BENEFITS */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-semibold mb-8 text-center">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <Star className="mx-auto mb-4 text-yellow-400" size={32} />
            <h3 className="font-semibold text-lg">Premium Quality</h3>
            <p className="text-gray-600 mt-2">Crafted with care, our fabrics feel as good as they look.</p>
          </div>
          <div>
            <img src="/images/360_icon.svg" alt="360 icon" className="mx-auto mb-4 h-8" />
            <h3 className="font-semibold text-lg">360° View</h3>
            <p className="text-gray-600 mt-2">See every detail before you buy. Confidence in every purchase.</p>
          </div>
          <div>
            <Mail className="mx-auto mb-4 text-blue-400" size={32} />
            <h3 className="font-semibold text-lg">Responsive Support</h3>
            <p className="text-gray-600 mt-2">We’re here to help with size, styling, and orders.</p>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 bg-gray-50 text-center px-8">
        <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
        <p className="text-gray-700 mb-6">Be the first to know about new arrivals and special offers.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none w-80"
          />
          <button className="bg-black text-white px-6 py-2 rounded-full">Subscribe</button>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-black text-white py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Your Brand Name. All rights reserved.</p>
      </footer>
    </div>
  );
}


export default LandingPage

