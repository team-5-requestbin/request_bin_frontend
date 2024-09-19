import settings from '../settings'
const BASE = settings.API_URL

function generateRandomHash() {  // Del me for prod
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
  // Dev
  const endpoint_hash = generateRandomHash()
  return { "endpoint_hash": endpoint_hash }

  // Prod below
  // try {
  //   // .post('/create')
  //   const response = await fetch(`${BASE}/create`, { method: 'POST' })
  //   if (response.status !== 200) {
  //     console.log(`Error createEndPoint ${response.status}`)
  //     return 'error'  // what to do?!?!?!?
  //   }
  //   const data = await response.json()
  //   return data
  // } catch (error) {
  //   console.error(error)
  // }
}

const getSingle = async (endpoint_id, request_id) => {
  try {
    // .get('/:endpoint_hash/:request_hash')
    const response = await fetch(BASE + 'request_objects')  // Dev
    // const response = await fetch(`${BASE}/${endpoint_id}/${request_id}`)  // Prod
    if (response.status !== 200) {
      console.log(`Error getSingle(${endpoint_id}) ${response.status}`)
      return 'error'  // what to do?!?!?!?
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}


const getAll = async (endpoint_id) => {
  // .get('/:endpoint_hash')
  try {
    const response = await fetch(BASE + 'requests'); // Dev
    // const response = await fetch(`${BASE}/${endpoint_id}`) // Prod
    if (response.status !== 200) {
      console.log(`Error getAll(${endpoint_id}) ${response.status}`)
      return 'error'  // what to do?!?!?!?
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}


const endpointExists = async (endpoint_id) => {
  // .get('/:endpoint_hash/exists')
  try {
    const response = await fetch(BASE + 'endpoint_exists') // Dev
    // const response = await fetch(`${BASE}/${endpoint_id}/exists`) // Prod
    const data = await response.json()
    console.log(`endpoint exists: ${response.status}`)
    return response.status === 200
  } catch (error) {
    console.error(error)
  }
}


const deleteAll = async (endpoint_id) => {
  // .delete('/:endpoint_hash')
  try {
    const response = await fetch(`${BASE}/${endpoint_id}`, { method: 'DELETE' }) // Prod
    return response.status === 204
  } catch (error) {
    console.error(error)
  }
}

export { createEndpoint, getSingle, getAll, endpointExists, deleteAll }
