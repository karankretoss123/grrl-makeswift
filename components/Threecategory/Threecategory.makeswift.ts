import { lazy } from 'react'

import { Style } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
  lazy(() => import('./Threecategory')),
  {
    type: 'Threecategory',
    label: 'Custom / Threecategory',
    props: {
      className: Style(),
    },
  }
)
