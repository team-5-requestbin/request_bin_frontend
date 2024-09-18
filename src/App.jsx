/* eslint-disable react/prop-types */
/* 
Wednesday/Thursday todos:

# FUNCTIONALITY:
- generate test requests which query our target endpoint
- checking local storage, populating local storage (persistent sessions, we are storing previously used endpoints)
- make our "copy to clipboard"
- update current url when we click "create new endpoint" (History API)


# UI:
- general layout and styling
- breaking down the "currently viewed request" data 

*/

import { useState, useEffect } from 'react'
import './App.css'
import {
  createEndpoint,
  getSingle,
  getAll,
  endpointExists,
} from './services/db_queries'

const CreateEndpointButton = ({ handleCreateEndpoint }) => {
  return (
    <>
      <button
        className="border-slate-600 border-8"
        onClick={handleCreateEndpoint}
      >
        CREATE ENDPOINT
      </button>
    </>
  )
}

const CurrentlyViewedRequest = ({ requestData }) => {
  console.log(requestData)
  return (
    <>
      {JSON.stringify(requestData)}
      <div>Details</div>
      <div>Headers</div>
      <div>Body</div>
    </>
  )
}

const EndpointView = ({ endpoint, handleCreateEndpoint }) => {
  const [currentRequest, setCurrentRequest] = useState(null)
  const [requests, setRequests] = useState([]) // conditional rendering with null or [], impact of useEffect and dom creation

  const handleFetchSingleRequest = async (endpoint_id, request_id) => {
    const singleRequest = await getSingle(endpoint_id, request_id)
    // console.log(`singleRequest: `, singleRequest)
    setCurrentRequest(singleRequest)
  }

  useEffect(() => {
    const fetchEndpointRequests = async (endpoint_id) => {
      const data = await getAll(endpoint_id)
      setRequests(data)
    }
    fetchEndpointRequests(endpoint)
  }, [])

  return (
    <>
      <div className="px-1 border-8">This is a request bin</div>
      <CreateEndpointButton handleCreateEndpoint={handleCreateEndpoint} />
      <button id="copy-button" onClick={() => alert(`copied: ${endpoint}`)}>
        Copy
      </button>
      <div>
        <span>Endpoint: {endpoint}</span>
      </div>

      <h4>Requests</h4>
      {requests.map((request) => {
        return (
          <li
            key={request.id}
            onClick={() => {
              handleFetchSingleRequest(endpoint, request.id)
              //   console.log('handleFetchSingleRequest was invoked by click')
            }}
          >
            {request.dt_received} | {request.method} | {request.path}
          </li>
        )
      })}
      <br />
      <br />
      <h3>
        <b>Currently Viewed Request</b>
      </h3>

      {currentRequest ? (
        <CurrentlyViewedRequest requestData={currentRequest} />
      ) : null}
    </>
  )
}

function App() {
  const [freshUser, setFreshUser] = useState(true)
  const [endpoint, setEndpoint] = useState(null)

  useEffect(() => {
    let path = window.location.pathname
    if (path === '/') return

    const regex = /^\/[a-z0-9]{8}\/view$/i

    if (!regex.test(path)) return

    const checkIfEndpointExists = async (candidate_endpoint) => {
      const exists = true //await endpointExists(candidate_endpoint)
      if (exists) {
        // navigates to an existing endpoint's view
        setFreshUser(false)
        setEndpoint(candidate_endpoint)
      }
    }

    const potentialEndpoint = path.slice(1, 9)

    checkIfEndpointExists(potentialEndpoint)

    console.log('valid:', potentialEndpoint)
  }, [])

  // how do we make async request?  probably not in USE EFFECT???
  const handleCreateEndpoint = async () => {
    const newEndpoint = await createEndpoint()
    // console.log(newEndpoint)
    setEndpoint(newEndpoint)

    // Current URL: https://my-website.com/page_a
    console.log()
    const nextURL = window.location.href
    const nextTitle = 'our Request bin'
    const nextState = { additionalInformation: 'Updated the URL with JS' }

    // This will create a new entry in the browser's history, without reloading
    window.history.pushState(nextState, nextTitle, nextURL)

    // setFreshUser(false)
  }

  return (
    <>
      {freshUser ? (
        <button
          onClick={() => {
            // console.log('create new endpoint ')
            handleCreateEndpoint()
          }}
        >
          new public endpoint
        </button>
      ) : (
        <EndpointView endpoint={endpoint} />
      )}
    </>
  )
}

export default App

// useEffect(() => {
// check url for a bin id

/*
    - input the base url of our request bin https://www.requestbin.com
    - input a url with a endpoint in the path https://www.requestbin.com/&@$@$&&/view

      - DOES THIS endpoint view exist for another user?  if it does exist for another client, add

      - check curr local storage for existing bins (endpoints)
          - if the key exists, load the last view of the most recent endpoint (last in the array)
          - otherwise -> , call createEndpoint, add to local storage, redirect to new url for VIEW of that endpoint
      */
//     const checkLocalStorage = () => {
//       const cachedEndpoints = localStorage.getItem('cached_endpoints')

//       if (!cachedEndpoints) {
//         // check db
//       }
//     }

//     return () => {}
//   }, [])

// const createNewBin = async (event) => {
//   event.preventDefault()

//   try {
//     const endpoint = createBin()

//     const endpointsArray = localStorage.getItem('bin5alive.endpoints')

//     endpointsArray.push(endpoint)

//     window.localStorage.setItem(
//       'bin5alive.endpoints',
//       JSON.stringify(endpointsArray)
//     )

//     window.localStorage.setItem('bin5alive.current', JSON.stringify(endpoint))
//   } catch (error) {
//     setErrorMessage('Error: Could not create a new bin')
//     setTimeout(() => {
//       setErrorMessage(null)
//     }, 3000)
//   }
// }
