// const BASE_URL = process.env.BASE_URL

const tempReq = {
  id: 1,
  dt_created: '2024-09-16 02:18:56.062676',
  endpoint: 'a111111',
  request_object: {
    method: 'POST',
    path: '/sample/post/request/',
    headers: {
      host: 'enlt637fuyveg.x.pipedream.net',
      'x-amzn-trace-id': 'Root=1-66e8a638-1ff856491e0f24cc2a0dd6f2',
      'content-length': 88,
      pragma: 'no-cache',
      'cache-control': 'no-cache',
      accept: 'application/json, text/plain, */*',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'content-type': 'application/json',
      origin: 'https://public.requestbin.com',
    },
    body: {
      id: 'ddc5f0ed-60ff-4435-abc5-590fafe4a771',
      timestamp: 1544827965,
      event: 'delivered',
    },
  },
}

const createEndpoint = async () => {
  alert('issued createEndpoint api call')
  return 'https://www.joelbarton.com/THE_ENDPOINT'
  //   return await fetch('/')
}

const getFullRequest = (endpoint_id, request_id) => {
  alert(`endpoint_id: ${endpoint_id}, request_id: ${request_id}`)
  return tempReq
}
// const getRequests = async (endpoint) => {
//   alert(`issued getRequests api call for this endpoint ${endpoint}`)

//   // return await fetch(endpoint)
// }

export { createEndpoint, getFullRequest }
