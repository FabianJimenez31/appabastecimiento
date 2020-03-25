

import {
  Home,
  Map,
  Store
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
  }
  
]