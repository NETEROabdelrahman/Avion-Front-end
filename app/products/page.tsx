import AllProducts from '@/components/AllProducts'
import Filter from '@/components/Filter'
import Image from 'next/image'


import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Avion ${searchParams?.filter || "all products"}`,
  }
}

const ProductsPage = ({searchParams}:any) => {
  
console.log(searchParams?.filter)



  return (
    <div className='relative'>
      <div className=' w-full flex justify-center items-center'>
        <Image
          className=' '
          src={require('../../public/images/Page Headers.png')}
          alt=''
          width={1530}
          height={209}
        />
      </div>
      <Filter
        searchParams={searchParams}
      />
      <AllProducts
        searchParams={searchParams}
      />
    </div>
  );
}

export default ProductsPage