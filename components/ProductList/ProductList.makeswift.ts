import { lazy } from 'react'

import { Shape, Style } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
  lazy(() => import('./ProductList')),
  {
    type: 'product-list',
    label: 'Custom / Product List',
    props: {
      className: Style(),
    },
  }
)
