

import {
  Home,
  Map,
  Store,
  products
} from 'src/Modules';
console.log(Home)
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
    path: '/products',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: products
  }

]