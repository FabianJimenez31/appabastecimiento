

import {
  Home,
  Map,
  Store,
  products
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
    path: '/maps',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: Map
  },
  {
    path: '/products/:id',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: products
  }

]