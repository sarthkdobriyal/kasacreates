import CategoryList from "@/components/CategoryList"
import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"
import { WixClientContext } from "@/context/wixContext"
import { wixClientServer } from "@/lib/wixClientServer"
import { useContext, useEffect } from "react"

const HomePage = async () => {


  const wixClient = await wixClientServer();


  return (
    <div className=''>
        <Slider />
        <div className="mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <h1 className="text-3xl font-semibold">Featured Products</h1>
          <ProductList />
        </div>

        <div className="mt-12">
          <h1 className="text-3xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64  font-semibold">Categories</h1>
          <CategoryList />
        </div>

    </div>
  )
}

export default HomePage