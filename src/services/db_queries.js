import settings from '../settings'
const BASE = settings.API_URL

function generateRandomHash() {
  const hash_length = 8
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0

  while (counter < hash_length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }

  return result
}

const createEndpoint = async () => {
    const endpoint_hash = generateRandomHash()
    return { "endpoint_hash": endpoint_hash }
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
