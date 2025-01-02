
"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ProductEach from './ProductEach';

const NewArrivals = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const headingRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  const products = [
    { id: 1, image: '/image 9.png', name: 'Custom Eco-friendly Water Bottle', price: 599, oldPrice: 999 },
    { id: 2, image: '/image 10.png', name: 'Custom Eco-friendly Mug', price: 599, oldPrice: 999 },
    { id: 3, image: '/image 11.png', name: 'Eco-friendly Lunch Box', price: 599, oldPrice: 999 },
    { id: 4, image: '/image 12.png', name: 'Reusable Water Bottle', price: 599, oldPrice: 999 },
    { id: 5, image: '/image 9.png', name: 'Custom Eco-friendly Water Bottle', price: 599, oldPrice: 999 },
    { id: 6, image: '/image 10.png', name: 'Custom Eco-friendly Mug', price: 599, oldPrice: 999 },
    { id: 7, image: '/image 11.png', name: 'Eco-friendly Lunch Box', price: 599, oldPrice: 999 },
    { id: 8, image: '/image 12.png', name: 'Reusable Water Bottle', price: 599, oldPrice: 999 },
  ];

  const handleSwipe = (direction) => {
    const containerWidth = productsRef.current.offsetWidth;
    const cardWidth = containerWidth / (window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    const maxIndex = products.length - (window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    } else if (direction === 'right' && currentIndex < maxIndex) {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: headingRef.current, start: "top bottom", end: "bottom center", toggleActions: "play none none reverse" } }
      );

      gsap.fromTo(productsRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: productsRef.current, start: "top bottom-=100", end: "bottom center", toggleActions: "play none none reverse" } }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = productsRef.current.offsetWidth;
      const cardWidth = containerWidth / (window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
      gsap.to(productsRef.current, { x: -cardWidth * currentIndex, duration: 0.5, ease: "power2.out" });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  const handleAddToCart = (product, color, size, quantity) => {
    console.log('Added to cart:', { product, color, size, quantity });
    // Implement your add to cart logic here
  };

  const handleBuyNow = (product, color, size, quantity) => {
    console.log('Buy now:', { product, color, size, quantity });
    // Implement your buy now logic here
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-8 font-Outfit text-black">
      <h2 ref={headingRef} className="text-2xl md:text-3xl lg:text-4xl font-semibold font-Cinzel text-center">
        New Arrivals
      </h2>
      <p className='font-Outfit font-medium text-lg text-center mb-5 text-black'>Discover our exciting New Arrivals</p>
      <div className="relative overflow-hidden">
        <div ref={productsRef} className="flex transition-transform duration-500 ease-out">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="group relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mt-8 justify-between">
                    <span className="text-lg font-semibold">
                      &#8377;{product.price.toFixed(2)}
                    </span>
                    <span className="text-pink-700 line-through text-lg">
                      &#8377;{product.oldPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleSwipe('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          aria-label="Previous product"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          aria-label="Next product"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ProductEach
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onClose={() => setSelectedProduct(null)}
          />
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
