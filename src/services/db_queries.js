const BASE = 'http://localhost:3000/' // process.env.BASE_URL

const createEndpoint = async () => {
  return 'https://www.joelbarton.com/THE_ENDPOINT'
  //   return await fetch('/')
}

const getSingle = async (endpoint_id, request_id) => {
  console.log(endpoint_id, request_id)
  const response = await fetch(BASE + 'request_objects')

  const data = await response.json()
  //   console.log(`getSingle: `, data)
  return data
}

const getAll = async (endpoint_id) => {
  try {
    console.log(endpoint_id) // needed for real db query
    const response = await fetch(BASE + 'requests')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const endpointExists = async (endpoint_id) => {
  try {
    const response = await fetch(BASE + endpoint_id)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export { createEndpoint, getSingle, getAll, endpointExists }
