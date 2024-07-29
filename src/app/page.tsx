import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"

const HomePage = () => {
  return (
    <div className=''>
        <Slider />
        <div className="mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <h1 className="text-3xl font-semibold">Featured Products</h1>
        <ProductList />
        </div>

    </div>
  )
}

export default HomePage