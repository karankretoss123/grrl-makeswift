'use client'

import { ReactNode, Ref, forwardRef, useEffect, useState } from 'react'
import clsx from 'clsx'
import axios from 'axios'

type ProductItem = {
    title: ReactNode
    price: ReactNode
    description: ReactNode
    image: string
  }
type Props = {
  className?: string
  categoryId: string
}

export const Fourproduct = forwardRef(function Tabs(
  { className, categoryId = 'Fourproduct' }: Props,
  ref: Ref<HTMLDivElement>
) {
    const apiUrl: string = process.env.apiUrl || ''
    const [products, setProducts] = useState<ProductItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchProductsByCategory = async (categoryId: string) => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `${apiUrl}v3/catalog/products/by-category?category=${categoryId}`,
          {
            headers: {
              'X-Auth-Token': process.env.accessToken,
            },
          }
        )
        const fetchedProducts = response.data.data
          .map((product: any) => ({
            title: product.name,
            price: `$${product.price}`,
            description: product.description,
            image: product.image || '',
          }))
          .slice(0, 4)
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }
  
    useEffect(() => {
      if (categoryId) fetchProductsByCategory(categoryId)
    }, [categoryId])
  return (
    <div ref={ref} className={clsx(className, 'p-5')}>
    {/* Product grid */}
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 xl:mx-[20rem] 2xl:mx-[22rem]">
      {isLoading ? (
        <div className="p-6 text-center text-lg text-gray-600">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="p-6 text-center text-lg text-gray-600">
          No products available for this category.
        </div>
      ) : (
        products.map((product, i) => (
          <div key={i} className="rounded-xl text-white shadow-lg">
            <img
              src={product.image}
              alt={product.title as string}
              className="h-[18rem] w-full rounded-[25px] object-cover md:h-[28rem]"
            />
            <h3 className="mt-4 text-lg">{product.title}</h3>
            {/* <h3 className="mt-4 text-lg font-bold">{product.image}----</h3> */}
            <div className="mt-2">{product.price}</div>
          </div>
        ))
      )}
    </div>
  </div>
  )
})

export default Fourproduct