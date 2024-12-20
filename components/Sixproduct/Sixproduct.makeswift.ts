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
  { label: 'Shop All', value: '23' },
  { label: '$1', value: '26' },
  { label: 'Accessories', value: '27' },
  { label: 'Beanies', value: '28' },
  { label: 'Bold Print Leggings', value: '29' },
  { label: "Collectors' Edition Close Out", value: '30' },
  { label: 'Dietary Assistance', value: '31' },
  { label: 'First Access', value: '32' },
  { label: 'Gift Certificates', value: '33' },
  { label: 'HALLOWEEN 2024', value: '34' },
  { label: 'Headwear', value: '35' },
  { label: 'Hoodies', value: '36' },
  { label: 'limited edition new gear', value: '37' },
  { label: 'Martial Arts', value: '38' },
  { label: 'New Gear', value: '39' },
  { label: 'Pre-Workout', value: '40' },
  { label: 'Protein', value: '41' },
  { label: 'Rainbow Unicorn Sunday', value: '42' },
  { label: 'Shorts', value: '43' },
  { label: 'Solid Print Leggings', value: '44' },
  { label: 'Sports Bras', value: '45' },
  { label: 'Squat Proof Leggings', value: '46' },
  { label: 'Sweatpants', value: '47' },
  { label: 'Under $10', value: '48' },
  { label: 'Vag Up', value: '49' },
  { label: 'Weekly Specials', value: '50' },
  { label: 'Workout Tops', value: '51' },
  { label: 'Workout Tops & Sports Bras', value: '52' },
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
