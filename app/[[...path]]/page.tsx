import { notFound } from 'next/navigation'

import { Page as MakeswiftPage } from '@makeswift/runtime/next'
import { getSiteVersion } from '@makeswift/runtime/next/server'
import axios from 'axios'

import { client } from '@/lib/makeswift/client'

type ParsedUrlQuery = { path?: string[] }

const apiUrl: string = process.env.apiUrl || ''
export async function generateStaticParams() {
  const makeswiftPages = await client
    .getPages()
    .map(page => ({
      path: page.path.split('/').filter(segment => segment !== ''),
    }))
    .toArray()

  // Fetch category slugs from your API
  const { data: categories } = await axios.get(`${apiUrl}v3/catalog/categories`, {
    headers: {
      'X-Auth-Token': process.env.accessToken,
    },
  })

  const categoryPaths = categories?.data.map((category: any) => ({
    path: [`category/${category.slug}`],
  }))
  console.log('makeswiftPages ---------------', makeswiftPages)
  console.log('categoryPaths ---------------', categoryPaths)

  // return makeswiftPages
  return [...makeswiftPages, ...(categoryPaths || [])]
}
interface PageParams {
  path: string[]
}
export default async function Page({ params }: { params: PageParams }) {
  const path = '/' + (params?.path ?? []).join('/')
  if (params?.path?.[0] === 'category' && params?.path?.[1]) {
    const slug = params.path[1]

    try {
      // Fetch category to validate its existence
      const { data: category } = await axios.get(`${apiUrl}v3/catalog/categories?slug=${slug}`, {
        headers: {
          'X-Auth-Token': process.env.accessToken,
        },
      })

      if (!category?.data?.length) {
        return notFound()
      }

      // Fetch Makeswift page snapshot
      const snapshot = await client.getPageSnapshot('/category/[slug]', {
        siteVersion: getSiteVersion(),
      })
      console.log('snapshot ', snapshot)

      if (!snapshot) {
        return notFound()
      }

      // Render Makeswift page
      return <MakeswiftPage snapshot={snapshot} />
    } catch (error) {
      console.error('Error fetching category or Makeswift page snapshot:', error)
      return notFound()
    }
  }
  const snapshot = await client.getPageSnapshot(path, {
    siteVersion: getSiteVersion(),
  })

  if (snapshot == null) return notFound()

  return <MakeswiftPage snapshot={snapshot} />
}
