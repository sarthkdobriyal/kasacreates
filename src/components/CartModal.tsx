"use client"

import { FC, useEffect, useState } from "react";
import { ClassValue } from "clsx";
import Image from "next/image";
import { WixClient } from '../context/wixContext';
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";

interface CartModalProps {}

const CartModal: FC<CartModalProps> = ({}) => {


  const wixClient = useWixClient();

  const {cart, isLoading, removeItem} = useCartStore()


  

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {
      isLoading ? (
        "Loading..."
      ):
      !cart.lineItems ? (
        <div>
          <h2 className="text-xl">Cart is Empty</h2>
        </div>
      ) : (
        <div className="">
          <h2 className="text-xl">Shopping Cart</h2>

          {/* LIST */}
          <div className="">
          {/* ITEM */}

          {
            cart.lineItems.map((item) => {
              return <div
              key={item._id}
              className="flex gap-4 mt-2">
              <Image
                src={wixMedia.getScaledToFillImageUrl(item.image,72,96,{})}
                alt=""
                height={96}
                width={72}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between">
                <div className="flex flex-col justify-between w-full">
                  <div className="">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">{item.productName?.original}</h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                        <div className="text-xs text-green-500">{item.quantity}</div>
                        )} 
                        {/* ${item.price?.amount} */}
                        {item.price?.formattedAmount}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className="text-sm text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                </div>

                {/* Bottom */}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. {item.quantity}</span>
                  <span
                    className="text-blue-500"
                    style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                    onClick={() => removeItem(wixClient, item._id!)}
                  >
                    Remove
                  </span>
                </div>
              </div>
            </div>
            })
          }
            
          </div>

          {/* BOTTOM CHECKOUT */}

          <div className="mt-5">
            <div className="flex items-center justify-between font-semibold">
            <span className="">Subtotal</span>
            <span className="">{cart.subtotal.formattedAmount}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between">
            <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
                // onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartModal;
