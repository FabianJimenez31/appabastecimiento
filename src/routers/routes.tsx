

import {
  Home
} from 'src/Modules';
console.log(Home)
export default () => [
  {
    path: '/',
    exact: true,
    // eslint-disable-next-line react/display-name
    component: Home
  }
  
]