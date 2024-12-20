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

runtime.registerComponent(
  lazy(() => import('./Sixproduct')),
  {
    type: 'Sixproduct',
    label: 'Custom / Sixproduct',
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
