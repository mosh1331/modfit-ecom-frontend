"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = ({productImage}) => {
  return (
    <section className="relative flex flex-col bg-[#f8f7f4]">
      {/* Image First for Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[60vh] sm:h-[70vh] md:h-screen"
      >
        <Image
          src={productImage}// Replace with your best product or lifestyle image
          alt="Modest Fashion"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Floating Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full shadow text-xs sm:text-sm font-medium"
        >
          Free Shipping All Over Kerala.
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-start px-4 sm:px-6 py-8 sm:py-12 max-w-2xl mx-auto"
      >
        <span className="px-3 py-1 mb-4 rounded-full bg-neutral-200 text-neutral-700 text-xs tracking-widest uppercase">
          New Collection
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug text-neutral-900">
          Modest. Minimal.<br className="hidden sm:block" /> Made for You.
        </h1>
        <p className="mt-3 text-base sm:text-lg text-neutral-600">
          Discover curated modest fashion pieces that blend elegance with modern style.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 w-full sm:w-auto"
        >
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-2xl bg-black text-white font-medium shadow-lg hover:bg-neutral-800 transition"
          >
            Shop Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
