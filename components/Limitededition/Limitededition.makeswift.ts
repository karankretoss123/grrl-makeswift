import { lazy } from 'react'

import { List, Select, Shape, Slot, Style, TextInput } from '@makeswift/runtime/controls'
import axios from 'axios'

import { runtime } from '@/lib/makeswift/runtime'

// let categories: { label: string; value: any }[] = [
//   {
//     label: 'Utility',
//     value: '22',
//   },
//   {
//     label: 'Shop All',
//     value: '23',
//   },
// ]

let categories: { label: string; value: any }[] = [
  {
    label: 'Beanies',
    value: '28',
  },
  {
    label: 'Accessories',
    value: '27',
  },
  {
    label: 'Bold Print Leggings',
    value: '29',
  },
  {
    label: "Collectors' Edition Close Out",
    value: '30',
  },
  {
    label: 'Squat Proof Leggings',
    value: '46',
  },
]

// const fetchCategories = async () => {
//   try {
//     const apiUrl: string = process.env.apiUrl || ''
//     const response = await axios.get(`${apiUrl}v3/catalog/categories`, {
//       headers: {
//         'X-Auth-Token': process.env.accessToken,
//       },
//     })
//     categories = response.data.data.map((category: any) => ({
//       label: category.name,
//       value: category.id.toString(),
//     }))
//   } catch (error) {
//     console.error('Error fetching categories:', error)
//   }
// }

// fetchCategories()
// .then(() => {
runtime.registerComponent(
  lazy(() => import('./Limitededition')),
  {
    type: 'Limitededition',
    label: 'Limitededition',
    props: {
      className: Style(),
      categoryId: Select({
        label: 'Category',
        get options() {
          return categories // Provide the current categories dynamically
        }, // Provide preloaded categories here
      }),
    },
  }
)
// })
