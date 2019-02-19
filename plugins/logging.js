export default ({ $axios, store }) => {
  $axios.onResponse(response => {
    console.log(`[${response.status}] ${response.request.path}`)
  })

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(err => {
    console.log(
      `[${err.response && err.response.status}] ${err.response &&
        err.response.request.path}`,
      err
    )
    console.log(err.response && err.response.data)
  })
}
