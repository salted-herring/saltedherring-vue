export default ({ $axios, store }) => {
  $axios.onResponse(response => {
    console.log(`[${response.status}] ${response.request.path}`)
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
