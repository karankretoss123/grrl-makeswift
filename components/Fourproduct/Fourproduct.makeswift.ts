import { lazy } from 'react'

import { Select, Style } from '@makeswift/runtime/controls'
import axios from 'axios'

import { runtime } from '@/lib/makeswift/runtime'

// Initial placeholder categories
let categories: { label: string; value: any }[] = []

// Fetch categories and update the options dynamically
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

// Register the component synchronously with a placeholder
runtime.registerComponent(
  lazy(() => import('./Fourproduct')),
  {
    type: 'Fourproduct',
    label: 'Custom / FourproductNew',
    props: {
      className: Style(),
      categoryId: Select({
        label: 'Category',
        get options() {
          return categories // Provide the current categories dynamically
        },
      }),
    },
  }
)
