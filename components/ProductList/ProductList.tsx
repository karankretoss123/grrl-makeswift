'use client'

import { notFound, usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import axios from 'axios'

type Props = {
  className?: string
}
export const ProductList = ({ className }: Props) => {
  const pathname = usePathname()
  const categorySlug = pathname?.split('/').pop() // Extract the last part of the path
  const apiUrl: string = process.env.apiUrl || ''
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const fetchProducts = async (page: number) => {
    setLoading(true)
    setError(false)

    try {
      const { data: productsData } = await axios.get(`${apiUrl}v3/catalog/products/by-slug`, {
        params: { categorySlug: categorySlug, page: page },
      })

      if (productsData.success === false) {
        return notFound()
      }

      setProducts(productsData.data)
      setTotalPages(productsData.pagination.totalPages)
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(currentPage)
  }, [currentPage])

  if (error) {
    return notFound()
  }
  const handleCategoryRedirect = (categorySlug: string) => {
    router.push(`/category/${categorySlug}`)
  }
  return (
    <div className={className}>
      <h1 className="text-xl font-bold">Product List</h1>
      <p className="text-lg">Slug: {categorySlug}</p>

      <button onClick={() => handleCategoryRedirect('accessories')}>accessories</button>
      {loading ? (
        <div className="flex min-h-screen items-center justify-center">
          <div className="loader h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {products.map((product: any) => (
              <div key={product.id} className="rounded-md border p-4 shadow-md">
                <img src={product.image}></img>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="mt-2 font-bold text-green-500">Price: ${product.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="rounded border bg-blue-500 px-4 py-2 text-white"
              >
                Previous
              </button>
            )}

            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>

            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="rounded border bg-blue-500 px-4 py-2 text-white"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ProductList
