"use client"
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { FC, useState } from "react";

interface AddProps {
  productId: string;
  variantId?: string;
  stockNumber: number;
}

const Add: FC<AddProps> = ({productId, variantId, stockNumber}) => {

  const [quantity, setquantity] = useState(1)
  // const stockNumber = 10

  const handleQuantity = (type: "i" | "d" ) => {
    if(type === 'i' && quantity < stockNumber) {
      setquantity((p) => p+1)
    }
    if(type === "d" && quantity > 1){
      setquantity((p) => p-1)
    }
  }

  const wixClient = useWixClient();

  const { addItem, isLoading } = useCartStore();
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>

      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
          <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity===1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity===stockNumber}
            >
              +
            </button>

          </div>
          { stockNumber> 0 && <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
              <br /> {"Don't"} miss it
            </div>}
        </div>
        
        
      <button
          onClick={() => {
            addItem(wixClient, productId, variantId, quantity)}}
          disabled={isLoading}
          className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
          >
          Add to Cart
        </button>
          </div>
    </div>
  );
};

export default Add;
