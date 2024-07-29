import Add from "@/components/Add"
import CustomizeProducts from "@/components/CustomizeProducts"
import ProductImages from "@/components/ProductImages"

const SinglePage = () => {
    return <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
        {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-6">
      <h1 className="text-4xl font-medium">product.name</h1>
        <p className="text-gray-500">product.description Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, exercitationem?</p>
        <div className="h-[2px] bg-gray-100"></div>
        <div className="flex gap-4 items-center">
        <h3 className="line-through text-gray-500 text-xl">$59</h3>
        <h3 className="font-medium text-2xl" >$ 23</h3>
        </div>
        <div className="h-[2px] bg-gray-100"></div>
        <CustomizeProducts />
        <Add />
        <div className="h-[2px] bg-gray-100"></div>
        <div className="text-sm">
            <h4 className="font-medium mb-4">Title</h4>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum aspernatur dolorum sequi maxime consectetur numquam.
            </p>
        </div>
        <div className="text-sm">
            <h4 className="font-medium mb-4">Title</h4>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum aspernatur dolorum sequi maxime consectetur numquam.
            </p>
        </div>
        <div className="text-sm">
            <h4 className="font-medium mb-4">Title</h4>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum aspernatur dolorum sequi maxime consectetur numquam.
            </p>
        </div>




      </div>
        
    </div>
}

export default SinglePage