import ProductCard from '@/components/shared/ProductCard';
import ProductCarousel from '@/components/shared/ProductCarousel'
import Searchbar from '@/components/shared/Searchbar'
import { getAllProducts } from '@/lib/actions';

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className='px-6 md:px-20 py-24'>
        <div className='flex justify-around gap-14'>
          {/* <ProductCarousel /> */}
          <div className='flex basis-1/2 flex-col justify-center'>
            <p>
              Start your shopping here
            </p>
            <p>git config --global http.proxy http://edcguest:edcguest@172.31.100.27:3128</p>
            <p>git config --global --unset http.proxy </p>
            <Searchbar />
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-10 px-6 md:px-20 py-24'>
        <h2 className='text-[32px] font-semibold'>All products</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home