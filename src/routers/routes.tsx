

import {
  Home,
  Map,
  Store,
  priceAbuse,
  productsAvailability,
  catering,
  computerProduct
} from 'src/Modules';
export default () => [
  {
    path: '/',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: Home
  },
  {
    path: '/store',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: Store
  },
  
  {
    path: '/products/:id',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: productsAvailability
  },
  {
    path: '/catering',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: catering
  },
  {
    path: '/maps',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: Map
  },
  {
    path: '/prince/abuse/:id',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: priceAbuse
  },
  {
    path: '/reporte/:id/:product',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: computerProduct
  },
  {
    path: '/abastecimiento',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: Store
  },
]