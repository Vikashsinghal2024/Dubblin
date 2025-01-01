

'use client'
import Image from 'next/image'
import { useState, useMemo, useRef, useEffect } from 'react'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { X } from 'lucide-react';
import { gsap } from 'gsap';

const ProductEach = ({ product, onAddToCart, onBuyNow, onClose }) => {
    const colors = [
        { name: 'Buttercup', colorCode: 'bg-yellow-400', priceMultiplier: 1, outlinecolor:'outline-yellow-400' },
        { name: 'Red', colorCode: 'bg-red-500', priceMultiplier: 1.1, outlinecolor:'outline-red-500' },
        { name: 'Pink', colorCode: 'bg-pink-300', priceMultiplier: 1.05, outlinecolor:'outline-pink-300' },
        { name: 'Brown', colorCode: 'bg-amber-800', priceMultiplier: 1.15, outlinecolor:'outline-amber-800' },
        { name: 'Green', colorCode: 'bg-green-500', priceMultiplier: 1.2, outlinecolor:'outline-green-500' },
    ];

    const sizes = ['150ml', '800ml', '500ml', '600ml', '1000ml'];

    const bottles = [
        { id: 1, image: '/dubblinbottle.png', basePrice: 930 },
        { id: 2, image: '/dubblin2.png', basePrice: 950 },
        { id: 3, image: '/bottle3.png', basePrice: 930 },
        { id: 4, image: '/bottle4.png', basePrice: 950 },
        { id: 5, image: '/bottle5.png', basePrice: 930 },
        { id: 6, image: '/dubblinbottle.png', basePrice: 950 },
        { id: 7, image: '/dubblin2.png', basePrice: 930 },
        { id: 8, image: '/dubblinbottle.png', basePrice: 950 },
        { id: 9, image: '/dubblin2.png', basePrice: 930 },
        { id: 10, image: '/dubblinbottle.png', basePrice: 950 },
        { id: 11, image: '/dubblin2.png', basePrice: 930 },
        { id: 12, image: '/dubblinbottle.png', basePrice: 950 },
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

    const calculatePrice = ( size, color) => {
        const sizeMultiplier = {
            '150ml': 1,
            '500ml': 1.2,
            '600ml': 1.3,
            '800ml': 1.5,
            '1000ml': 1.8
        };
        const colorMultiplier = colors.find(c => c.name === color.name)?.priceMultiplier || 1;
        return sizeMultiplier[size] * colorMultiplier;
    };

    const currentPrice = useMemo(() => {
        return calculatePrice( selectedSize, selectedColor);
    }, [selectedBottle, selectedSize, selectedColor]);

    const handleImageClick = () => {
        if (isHovering) {
            setZoomLevel(prevZoom => {
                const newZoom = prevZoom + 0.5;
                return newZoom > 3 ? 1 : newZoom;
            });
        }
    };

    const bottleListRef = useRef(null);

    const scrollBottles = (direction) => {
        const container = bottleListRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
            onComplete: () => onAddToCart(product, selectedColor.name, selectedSize, quantity)
        });
    };

    const handleBuyNow = () => {
        gsap.to(buyNowButtonRef.current, {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
            onComplete: () => onBuyNow(product, selectedColor.name, selectedSize, quantity)
        });
    };

    return (
        <>
        <h1 className='text-center text-4xl my-6 text-black font-Outfit'>Product Deatails</h1>
         <div className='flex flex-wrap font-Outfit'>
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
                            cursor: isHovering ? 'zoom-in' : 'auto',
                            // maxHeight: '600px' 
                        }}
                    />
                </div>

                <div className="flex mt-5 items-center justify-center">
                    <button 
                        onClick={() => scrollBottles('left')} 
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
                                        selectedBottle.id === bottle.id ? 'ring-2 ring-blue-500 scale-110' : 'hover:scale-105'
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
                        onClick={() => scrollBottles('right')} 
                        className="transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                        disabled={scrollPosition >= (bottles.length - 1) * 80}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>

         
            <div className="w-full mt-5 md:w-1/2 px-5">
            <div className=' flex justify-between'>
                <h1 className="text-xl font-semibold">Custom Ecofriendly Water Bottles</h1>

                </div>
                <div className="space-y-4 mt-8 mb-8 flex flex-col justify-center">
                    <p className='flex text-sm'><strong className='w-1/4 block'>Available:</strong> <span className='block w-1/4 text-slate-500 font-semibold'>In stock</span></p>
                    <p className='flex text-sm'><strong className='w-1/4 block'>Capacity</strong> <span className='block w-1/4 text-slate-500 font-semibold'>{capacity}</span></p>
                    <p className='flex text-sm'><strong className='w-1/4 block'>Special Feature</strong> <span className='block text-slate-500 font-semibold'>Double Wall Insulated, BPA Free, No Sweat Exterior</span></p>
                    <p className='flex text-sm'><strong className='w-1/4 block'>Model Name:</strong> <span className='block w-1/4 text-slate-500 font-semibold'>Dubblin Custom</span></p>
                </div>
                <div className="space-y-2 mb-4">
                    <div className="text-sm font-medium">Select Color: <span>{selectedColor.name}</span></div>
                    <div className="flex flex-wrap gap-1">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color)}
                                className="flex flex-col items-center space-y-1 p-2 rounded-lg"
                            >
                                <div className={`w-6 h-6 flex justify-center items-center rounded-full border outline outline-1 ${color.outlinecolor} ${color.colorCode}`}>
                                    {selectedColor.name === color.name ? <IoCheckmark className='text-xl text-white'/> : ''}
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
                                        ? 'bg-pink-300 text-pink-600 border-pink-600 border'
                                        : 'bg-gray-100 text-gray-800 border-gray-100 border'
                                }`}
                            >
                                <div className='p-1'><div className={`rounded-full p-2 ${selectedSize === size ? 'bg-pink-600' : 'bg-gray-100'}`}></div></div>
                                <div className='text-sm'>
                                    {size}                                
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-4 w-full border border-slate-500">
                    <div className="text-2xl p-2 text-pink-800 font-semibold bg-gray-200 flex items-center border-2 border-slate-300">
                        &#8377;{currentPrice.toFixed(2)}
                    </div>
                    <div className='ml-5'>
                        <h2 className="text-sm font-medium mb-2">Quantity:</h2>
                        <div className="flex items-center">
                            <div className="flex items-center border">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-gray-200 px-3 text-xl">-</button>
                                <p className="px-3 text-md">{quantity}</p>
                                <button onClick={() => setQuantity(q => q + 1)} className="bg-gray-200 px-3 text-xl">+</button>
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

         <div className='container mx-auto flex flex-col items-center px-4'>
            <div className='container mx-auto mt-6 flex flex-col md:flex-row items-center '>

                    <div className='text-2xl md:text-3xl text-black font-bold mb-4'>
                        <h1>Discription</h1>
                    </div>
            </div>
            <hr className='border-t-2 border-black w-full' />
            <div className='container mx-auto mt-6 flex flex-col  md:flex-row items-center md:px-5 lg:px-10'>
            <div className="space-y-4 mt-8 mb-8 flex flex-col gap-4 text-xl justify-center">
                    <p className='flex gap-10'><strong className='w-1/4 block'>Material</strong> <span className='block w-1/4 text-slate-500 font-semibold'>In stock</span></p>
                    <p className='flex gap-10'><strong className='w-1/4 block'>Colour</strong> <span className='block w-1/4 text-slate-500 font-semibold'>{capacity}</span></p>
                    <p className='flex gap-10'><strong className='w-1/4 block'>Capacity</strong> <span className='block text-slate-500 font-semibold'>Double Wall Insulated, BPA Free, No Sweat Exterior</span></p>
                    <p className='flex gap-10'><strong className='w-1/4 block '>Brand</strong> <span className='block w-1/4 text-slate-500 font-semibold'>Dubblin Custom</span></p>
                    <p className='flex gap-10'><strong className='w-1/4 block '>Item Weight</strong> <span className='block w-1/4 text-slate-500 font-semibold'>Dubblin Custom</span></p>
                    <p className='flex gap-10'><strong className='w-1/4 block '>Item Dimensions LxWxH</strong> <span className='block w-1/4 text-slate-500 font-semibold'>Dubblin Custom</span></p>
                    <p className='flex gap-10'><strong className='w-1/4 block '>Manufacturer</strong> <span className='block w-1/4 text-slate-500 font-semibold'>Dubblin Custom</span></p>
                    <p className='flex gap-10'><strong className='w-1/4 block '>Model Name:</strong> <span className='block w-1/4 text-slate-500 font-semibold'>Dubblin Custom</span></p>
                    <p className='flex gap-10'><strong className='w-1/4 block '>Model Name:</strong> <span className='block w-1/4 text-slate-500 font-semibold'>Dubblin Custom</span></p>
                </div>
            </div>
         </div>
         </>
    );
};

export default ProductEach;

