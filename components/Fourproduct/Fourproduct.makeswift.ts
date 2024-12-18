import { lazy } from 'react'

import { List, Select, Shape, Slot, Style, TextInput } from '@makeswift/runtime/controls'
import axios from 'axios'

import { runtime } from '@/lib/makeswift/runtime'

let categories: { label: string; value: any }[] = []

const fetchCategories = async () => {
  try {
    const apiUrl: string = process.env.apiUrl || ''
    const response = await axios.get(`${apiUrl}v3/catalog/categories`, {
      headers: {
        'X-Auth-Token': process.env.accessToken,
      },
    })
    categories = response.data.data.map((category: any) => ({
      label: category.name,
      value: category.id.toString(),
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}
fetchCategories()
// .then(() => {
runtime.registerComponent(
  lazy(() => import('./Fourproduct')),
  {
    type: 'Fourproduct',
    label: 'Custom / FourproductNew',
    props: {
      className: Style(),
      categoryId: Select({
        label: 'Category',
        options: categories, // Provide preloaded categories here
      }),
    },
  }
)
// })
