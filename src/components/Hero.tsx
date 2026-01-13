"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const shoeImages = [
  "/shoes/shoe-5.avif",
  "/shoes/shoe-6.avif",
  "/shoes/shoe-7.avif",
  "/shoes/shoe-8.avif",
  "/shoes/shoe-9.avif",
  "/shoes/shoe-10.avif",
  "/shoes/shoe-11.avif",
  "/shoes/shoe-12.avif",
];

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [randomShoe, setRandomShoe] = useState(shoeImages[0]);

  useEffect(() => {
    // Set random shoe only on client side after mount
    setRandomShoe(shoeImages[Math.floor(Math.random() * shoeImages.length)]);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[600px] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-neutral-900">
      {/* Animated background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Hero shoe image */}
      <div
        className="absolute right-0 top-1/2 h-[500px] w-[700px] -translate-y-1/2 opacity-40"
        style={{
          transform: `translate(${scrollY * 0.3}px, -50%) rotate(${
            -15 + scrollY * 0.05
          }deg)`,
        }}
      >
        <Image
          src={randomShoe}
          alt="Nike Shoe"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl font-bold leading-tight text-light-100 lg:text-7xl">
              Trade 365
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Nike Hub
              </span>
            </h1>
          </div>

          <p className="animate-fade-in-up text-xl text-light-300 delay-100">
            Premium Nike footwear for every athlete. Discover the latest
            collections and exclusive releases.
          </p>

          <div className="flex gap-4 animate-fade-in-up delay-200">
            <Link
              href="/products"
              className="rounded-full bg-light-100 px-8 py-3 text-body-medium text-dark-900 transition-all hover:scale-105 hover:bg-light-200"
            >
              Shop Now
            </Link>
            <Link
              href="/products?badge=new"
              className="rounded-full border-2 border-light-100 px-8 py-3 text-body-medium text-light-100 transition-all hover:bg-light-100 hover:text-dark-900"
            >
              New Arrivals
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8 animate-fade-in-up delay-300">
            <div>
              <div className="text-3xl font-bold text-light-100">500+</div>
              <div className="text-sm text-light-400">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-light-100">50K+</div>
              <div className="text-sm text-light-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-light-100">4.8★</div>
              <div className="text-sm text-light-400">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-light-300">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
