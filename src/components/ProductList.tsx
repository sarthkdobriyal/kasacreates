import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface ProductListProps {
  
}

const ProductList: FC<ProductListProps> = ({}) => {
  return <div className='flex gap-x-8 gap-y-8 flex-wrap justify-between mt-12'>


    <Link href='/gjkgkj' className='w-full flex flex-col gap-3 sm:w-[45%] lg:w-[22%]'>
     <div className='relative w-full h-80  '>
     <Image 
        src='https://images.pexels.com/photos/20269075/pexels-photo-20269075/free-photo-of-bouquet-of-crochet-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        alt=''
        fill
        sizes='25vw'
        className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
     />
     <Image 
     src='https://images.pexels.com/photos/3945638/pexels-photo-3945638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
     alt=''
     fill
    //  sizes='25vw'
     className='absolute object-cover rounded-md'
  />
     
     </div>

    <div className="flex justify-between">
        <span className='font-bold'>Product Name</span>
        <span className='font-semibold'>$80</span>
    </div>

    <div className="text-sm text-gray-500 ">Description Lorem, ipsum dolor.</div>
    <button className='rounded-2xl hover:text-white hover:bg-lama py-2 ring-1 ring-lama text-lama w-max px-4'>
        Add to cart
    </button>

    </Link>

    <Link href='/hggh' className='w-full flex flex-col gap-3 sm:w-[45%] lg:w-[22%]'>
     <div className='relative w-full h-80  '>
     <Image 
        src='https://images.pexels.com/photos/20269075/pexels-photo-20269075/free-photo-of-bouquet-of-crochet-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        alt=''
        fill
        sizes='25vw'
        className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
     />
     <Image 
     src='https://images.pexels.com/photos/3945638/pexels-photo-3945638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
     alt=''
     fill
    //  sizes='25vw'
     className='absolute object-cover rounded-md'
  />
     
     </div>

    <div className="flex justify-between">
        <span className='font-bold'>Product Name</span>
        <span className='font-semibold'>$80</span>
    </div>

    <div className="text-sm text-gray-500 ">Description Lorem, ipsum dolor.</div>
    <button className='rounded-2xl hover:text-white hover:bg-lama py-2 ring-1 ring-lama text-lama w-max px-4'>
        Add to cart
    </button>

    </Link>

    <Link href='/vvj' className='w-full flex flex-col gap-3 sm:w-[45%] lg:w-[22%]'>
     <div className='relative w-full h-80  '>
     <Image 
        src='https://images.pexels.com/photos/20269075/pexels-photo-20269075/free-photo-of-bouquet-of-crochet-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        alt=''
        fill
        sizes='25vw'
        className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
     />
     <Image 
     src='https://images.pexels.com/photos/3945638/pexels-photo-3945638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
     alt=''
     fill
    //  sizes='25vw'
     className='absolute object-cover rounded-md'
  />
     
     </div>

    <div className="flex justify-between">
        <span className='font-bold'>Product Name</span>
        <span className='font-semibold'>$80</span>
    </div>

    <div className="text-sm text-gray-500 ">Description Lorem, ipsum dolor.</div>
    <button className='rounded-2xl hover:text-white hover:bg-lama py-2 ring-1 ring-lama text-lama w-max px-4'>
        Add to cart
    </button>

    </Link>

    <Link href='/vjghvj' className='w-full flex flex-col gap-3 sm:w-[45%] lg:w-[22%]'>
     <div className='relative w-full h-80  '>
     <Image 
        src='https://images.pexels.com/photos/20269075/pexels-photo-20269075/free-photo-of-bouquet-of-crochet-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        alt=''
        fill
        sizes='25vw'
        className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
     />
     <Image 
     src='https://images.pexels.com/photos/3945638/pexels-photo-3945638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
     alt=''
     fill
    //  sizes='25vw'
     className='absolute object-cover rounded-md'
  />
     
     </div>

    <div className="flex justify-between">
        <span className='font-bold'>Product Name</span>
        <span className='font-semibold'>$80</span>
    </div>

    <div className="text-sm text-gray-500 ">Description Lorem, ipsum dolor.</div>
    <button className='rounded-2xl hover:text-white hover:bg-lama py-2 ring-1 ring-lama text-lama w-max px-4'>
        Add to cart
    </button>

    </Link>
    
  </div>
}

export default ProductList