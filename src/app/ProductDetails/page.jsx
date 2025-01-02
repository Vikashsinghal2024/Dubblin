"use client";
import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoCheckmark } from "react-icons/io5";
import { X } from "lucide-react";
import { gsap } from "gsap";

const Page = ({ product, onAddToCart, onBuyNow, onClose }) => {

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

//   const handleAddToCart = (product, color, size, quantity) => {
//     console.log('Added to cart:', { product, color, size, quantity });
//     // Implement your add to cart logic here
//   };

//   const handleBuyNow = (product, color, size, quantity) => {
//     console.log('Buy now:', { product, color, size, quantity });
//     // Implement your buy now logic here
//   };

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

  const colors = [
    {
      name: "Buttercup",
      colorCode: "bg-yellow-400",
      priceMultiplier: 1,
      outlinecolor: "outline-yellow-400"
    },
    {
      name: "Red",
      colorCode: "bg-red-500",
      priceMultiplier: 1.1,
      outlinecolor: "outline-red-500"
    },
    {
      name: "Pink",
      colorCode: "bg-pink-300",
      priceMultiplier: 1.05,
      outlinecolor: "outline-pink-300"
    },
    {
      name: "Brown",
      colorCode: "bg-amber-800",
      priceMultiplier: 1.15,
      outlinecolor: "outline-amber-800"
    },
    {
      name: "Green",
      colorCode: "bg-green-500",
      priceMultiplier: 1.2,
      outlinecolor: "outline-green-500"
    }
  ];

  const sizes = ["150ml", "800ml", "500ml", "600ml", "1000ml"];

  const bottles = [
    { id: 1, image: "/dubblinbottle.png", basePrice: 930 },
    { id: 2, image: "/dubblin2.png", basePrice: 950 },
    { id: 3, image: "/bottle3.png", basePrice: 930 },
    { id: 4, image: "/bottle4.png", basePrice: 950 },
    { id: 5, image: "/bottle5.png", basePrice: 930 },
    { id: 6, image: "/dubblinbottle.png", basePrice: 950 },
    { id: 7, image: "/dubblin2.png", basePrice: 930 },
    { id: 8, image: "/dubblinbottle.png", basePrice: 950 },
    { id: 9, image: "/dubblin2.png", basePrice: 930 },
    { id: 10, image: "/dubblinbottle.png", basePrice: 950 },
    { id: 11, image: "/dubblin2.png", basePrice: 930 },
    { id: 12, image: "/dubblinbottle.png", basePrice: 950 }
  ];

  const [selectedBottle, setSelectedBottle] = useState(product || bottles[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [capacity, setCapacity] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const addToCartButtonRef = useRef(null);
  const buyNowButtonRef = useRef(null);

  const calculatePrice = (size, color) => {
    const sizeMultiplier = {
      "150ml": 1,
      "500ml": 1.2,
      "600ml": 1.3,
      "800ml": 1.5,
      "1000ml": 1.8
    };
    const colorMultiplier =
      colors.find((c) => c.name === color.name)?.priceMultiplier || 1;
    return sizeMultiplier[size] * colorMultiplier;
  };

  const currentPrice = useMemo(() => {
    return calculatePrice(selectedSize, selectedColor);
  }, [selectedBottle, selectedSize, selectedColor]);

  const handleImageClick = () => {
    if (isHovering) {
      setZoomLevel((prevZoom) => {
        const newZoom = prevZoom + 0.5;
        return newZoom > 3 ? 1 : newZoom;
      });
    }
  };

  const bottleListRef = useRef(null);

  const scrollBottles = (direction) => {
    const container = bottleListRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  const handleAddToCart = () => {
    gsap.to(addToCartButtonRef.current, {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () =>
        onAddToCart(product, selectedColor.name, selectedSize, quantity)
    });
  };

  const handleBuyNow = () => {
    gsap.to(buyNowButtonRef.current, {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () =>
        onBuyNow(product, selectedColor.name, selectedSize, quantity)
    });
  };

  return (
    <>
      <h1 className="text-center text-4xl my-6 text-black font-Outfit">
        Product Deatails
      </h1>
      <div className="flex flex-wrap font-Outfit">
        <div className="w-full md:w-1/2 mb-6 md:mb-0 mt-5 px-5">
          <div
            className="flex justify-center relative overflow-hidden"
            // style={{ maxHeight: '600px' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setZoomLevel(1);
            }}
            onClick={handleImageClick}
          >
            <Image
              src={selectedBottle.image}
              alt="Selected bottle"
              width={600}
              height={600}
              className="transition-transform duration-300 ease-in-out w-full h-4/5 object-contain"
              style={{
                transform: `scale(${zoomLevel})`,
                cursor: isHovering ? "zoom-in" : "auto"
                // maxHeight: '600px'
              }}
            />
          </div>

          <div className="flex mt-5 items-center justify-center">
            <button
              onClick={() => scrollBottles("left")}
              className="transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
              disabled={scrollPosition <= 0}
            >
              <FaChevronLeft />
            </button>
            <div
              ref={bottleListRef}
              className="flex overflow-x-hidden space-x-4 px-8"
            >
              {bottles.map((bottle) => (
                <div key={bottle.id} className="flex-none">
                  <button
                    onClick={() => setSelectedBottle(bottle)}
                    className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                      selectedBottle.id === bottle.id
                        ? "ring-2 ring-blue-500 scale-110"
                        : "hover:scale-105"
                    }`}
                  >
                    <Image
                      src={bottle.image}
                      height={80}
                      width={80}
                      alt={`Bottle ${bottle.id}`}
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollBottles("right")}
              className="transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
              disabled={scrollPosition >= (bottles.length - 1) * 80}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="w-full mt-5 md:w-1/2 px-5">
          <div className=" flex justify-between">
            <h1 className="text-xl font-semibold">
              Custom Ecofriendly Water Bottles
            </h1>
          </div>
          <div className="space-y-4 mt-8 mb-8 flex flex-col justify-center">
            <p className="flex text-sm">
              <strong className="w-1/4 block">Available:</strong>{" "}
              <span className="block w-1/4 text-slate-500 font-semibold">
                In stock
              </span>
            </p>
            <p className="flex text-sm">
              <strong className="w-1/4 block">Capacity</strong>{" "}
              <span className="block w-1/4 text-slate-500 font-semibold">
                {capacity}
              </span>
            </p>
            <p className="flex text-sm">
              <strong className="w-1/4 block">Special Feature</strong>{" "}
              <span className="block text-slate-500 font-semibold">
                Double Wall Insulated, BPA Free, No Sweat Exterior
              </span>
            </p>
            <p className="flex text-sm">
              <strong className="w-1/4 block">Model Name:</strong>{" "}
              <span className="block w-1/4 text-slate-500 font-semibold">
                Dubblin Custom
              </span>
            </p>
          </div>
          <div className="space-y-2 mb-4">
            <div className="text-sm font-medium">
              Select Color: <span>{selectedColor.name}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className="flex flex-col items-center space-y-1 p-2 rounded-lg"
                >
                  <div
                    className={`w-6 h-6 flex justify-center items-center rounded-full border outline outline-1 ${color.outlinecolor} ${color.colorCode}`}
                  >
                    {selectedColor.name === color.name ? (
                      <IoCheckmark className="text-xl text-white" />
                    ) : (
                      ""
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2 mb-10">
            <div className="text-sm font-medium">Size:</div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setCapacity(size);
                  }}
                  className={`px-1 flex items-center ${
                    selectedSize === size
                      ? "bg-pink-300 text-pink-600 border-pink-600 border"
                      : "bg-gray-100 text-gray-800 border-gray-100 border"
                  }`}
                >
                  <div className="p-1">
                    <div
                      className={`rounded-full p-2 ${
                        selectedSize === size ? "bg-pink-600" : "bg-gray-100"
                      }`}
                    ></div>
                  </div>
                  <div className="text-sm">{size}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4 w-full border border-slate-500">
            <div className="text-2xl p-2 text-pink-800 font-semibold bg-gray-200 flex items-center border-2 border-slate-300">
              &#8377;{currentPrice.toFixed(2)}
            </div>
            <div className="ml-5">
              <h2 className="text-sm font-medium mb-2">Quantity:</h2>
              <div className="flex items-center">
                <div className="flex items-center border">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="bg-gray-200 px-3 text-xl"
                  >
                    -
                  </button>
                  <p className="px-3 text-md">{quantity}</p>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="bg-gray-200 px-3 text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className=" text-lg px-4 pb-4">
              <button
                ref={addToCartButtonRef}
                onClick={handleAddToCart}
                className="w-[100%]  text-black border border-black px-6 py-2 rounded-md transition-colors"
              >
                Add to Cart
              </button>
              <button
                ref={buyNowButtonRef}
                onClick={handleBuyNow}
                className="w-[100%] text-white bg-black px-6 py-2 mt-5 rounded-md hover:bg-gray-800 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col font-Outfit items-center px-4">
        <div className="container mx-auto mt-6 flex flex-col md:flex-row items-center ">
          <div className="text-2xl md:text-3xl text-black font-bold mb-4">
            <h1>Discription</h1>
          </div>
        </div>
        <hr className="border-t-2 border-black w-full" />
        <div className="container mx-auto mt-6 flex flex-col items-center md:flex-row md:px-5 lg:px-10">
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4 text-lg md:w-full lg:w-3/4">
            <div className="flex justify-between items-center">
              <strong className="text-gray-700">Material</strong>
              <span className="text-slate-500 font-semibold">
                Stainless Steel
              </span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-700">Colour</strong>
              <span className="text-slate-500 font-semibold">Violet</span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-700">Capacity</strong>
              <span className="text-slate-500 font-semibold">
                800 Millilitres
              </span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-700">Brand</strong>
              <span className="text-slate-500 font-semibold">DUBBLIN</span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-700">Item Weight</strong>
              <span className="text-slate-500 font-semibold">410 Grams</span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-700">Item Dimensions LxWxH</strong>
              <span className="text-slate-500 font-semibold">
                9 x 9 x 29.5 Centimetres
              </span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-700">Manufacturer</strong>
              <span className="text-slate-500 font-semibold">DUBBLIN</span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-700">Item Model Number</strong>
              <span className="text-slate-500 font-semibold">
                DREAM 800 Violet
              </span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-700">Product Dimensions</strong>
              <span className="text-slate-500 font-semibold">
                9 x 9 x 29.5 cm; 410 Grams
              </span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-700">ASIN</strong>
              <span className="text-slate-500 font-semibold">B08F7VPLBW</span>
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default Page;
