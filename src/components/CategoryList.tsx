import { wixClientServer } from '@/lib/wixClientServer'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface CategoryListProps {
  
}

const CategoryList: FC<CategoryListProps> = async ({}) => {
    const wixClient = await wixClientServer();
    const res = await wixClient.collections.queryCollections().find();


  return <div className='px-4 overflow-x-scroll mt-8 scrollbar-hide'>
    <div className='flex gap-4 mad:gap-8'>
        {
            res.items.map((cat) => {
                return <Link 
                    key={cat._id}
                href={`/list?cat=${cat.slug}`} className='flex-shrink-0 w-full sm:w-1/2 lg:w1/4 xl:w-1/6'>
                <div className=' relative bg-slate-100 w-full h-96'>
                    <Image src={cat.media?.mainMedia?.image?.url} alt='' fill sizes='20vw' className="object-cover" />
                </div>
                <h1 className="text-xl mt-6 font-light tracking-wide">{cat.name}</h1>
            </Link>
            })

        }
        
        
        
        
    </div>
    
  </div>
}

export default CategoryList