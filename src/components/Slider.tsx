"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShinyButton from "./ShinyButton";

const slides = [
  {
    id: 1,
    title: "Handcrafted Items",
    description: "Transform Your Home with Unique Masterpieces!",
    img: "https://images.pexels.com/photos/20269075/pexels-photo-20269075/free-photo-of-bouquet-of-crochet-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Personalized Crocheting",
    description: "Crafting Unique Creations Just for You",
    img: "https://images.pexels.com/photos/3945638/pexels-photo-3945638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Newest Products",
    description: "Releasing at 20% discount soon!",
    img: "https://images.pexels.com/photos/4792086/pexels-photo-4792086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide, i) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            {i % 2 === 0 ? (
              <>
                <TextContainer slide={slide} />

                <ImageContainer url={slide.img} />
              </>
            ) : (
              <>
              
                <ImageContainer url={slide.img} />
                
                <TextContainer slide={slide} />
              </>
            )}

          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TextContainer = ({
  slide,
}: {
  slide: {
    id: number;
    title: string;
    description: string;
    img: string;
    url: string;
    bg: string;
  };
}) => {
  return (
    <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center pl-1">
      <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{slide.description}</h2>
      <h1 className="text-5xl lg:text-6xl 2xl:text-8xl w-[80%] font-semibold">
        {slide.title}
      </h1>
      <Link href={slide.url}>
        <button className="rounded-md bg-black text-white py-3 px-4 ">
          VIEW MORE
        </button>
      </Link>
    </div>
  );
};

const ImageContainer = ({ url }: { url: string; }) => {
  return (
    <div className="h-1/2 xl:w-1/2 xl:h-full relative">
      <Image src={url} alt="" fill sizes="100%" className="object-cover" />
    </div>
  );
};

export default Slider;
