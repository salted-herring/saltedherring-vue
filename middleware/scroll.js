export default function({ store, route, redirect }) {
  if (typeof window !== 'undefined') {
    require('smoothscroll-anchor-polyfill')
  }
}
