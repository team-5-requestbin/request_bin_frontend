/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

import './App.css'
import {
  createEndpoint,
  getSingle,
  getAll,
  //   endpointExists,
} from './services/db_queries'

const CreateEndpointButton = ({ handleCreateEndpoint }) => {
  return (
    <>
      <button
        className="font-bold py-3 px-20 rounded-full hover:bg-green-500 transition duration-400"
        onClick={() => {
          console.log('created endpoint: ', handleCreateEndpoint())
        }}
      >
        new endpoint
      </button>
    </>
  )
}
// fresh session...
const GenerateEndpoint = ({ handleCreateEndpoint, setFreshUser }) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-800 text-white">
      <button
        className="font-bold py-3 px-5 rounded-full shadow-lg bg-green-500 transition duration-400"
        onClick={() => {
          handleCreateEndpoint()
          setFreshUser(false)
        }}
      >
        Generate Endpoint
      </button>
    </main>
  )
}

const CopyButton = ({ endpoint }) => {
  // add "COPIED" behavior in the button
  return (
    <button
      className="font-bold py-3 px-20 rounded-full shadow-lg hover:bg-sky-400 transition duration-400"
      onClick={() =>
        navigator.clipboard.writeText(window.location.href + endpoint)
      }
    >
      copy endpoint
    </button>
  )
}

const TargetEndpoint = ({ endpoint }) => {
  return (
    <button
      className="font-extrabold py-3 px-5 border-4 border-sky-400 rounded-sm"
      onClick={() => {
        console.log('tried to copy: ', window.location.href + endpoint)
      }}
    >
      {window.location.href + endpoint}
    </button>
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

const RequestTable = ({ requests, endpoint, handleFetchSingleRequest }) => {
  return (
    <>
      <h3>Requests</h3>
      <div className="overflow-y-auto grid-rows-1">
        {requests.map((request) => (
          <Request
            request={request}
            key={request.id}
            endpoint={endpoint}
            handleFetchSingleRequest={handleFetchSingleRequest}
          />
        ))}
      </div>
    </>
  )
}

const Request = ({ request, handleFetchSingleRequest, endpoint }) => {
  return (
    <span
      className="border-4 border-red-100"
      key={request.id}
      onClick={() => {
        handleFetchSingleRequest(endpoint, request.id)
      }}
    >
      {request.method} | {request.path}
    </span>
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
  }, [endpoint])

  return (
    <>
      <div className="min-h-screen flex-col items-center bg-neutral-800 text-white">
        <nav className="h-1/8 flex flex-row py-5 px-5 align-baseline">
          <div className="flex-1">
            <TargetEndpoint endpoint={endpoint} />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <CopyButton endpoint={endpoint} />
            <CreateEndpointButton handleCreateEndpoint={handleCreateEndpoint} />
          </div>
        </nav>

        <main className="h-7/8 flex flex-row py-5 px-5 align-baseline">
          <div className="flex-1">
            <RequestTable
              requests={requests}
              endpoint={endpoint}
              handleFetchSingleRequest={handleFetchSingleRequest}
            />
          </div>
          <div className="flex-1">
            <h3>
              <b>Currently Viewed Request</b>
            </h3>

            {currentRequest ? (
              <CurrentlyViewedRequest requestData={currentRequest} />
            ) : null}
          </div>
        </main>
      </div>
    </>
  )
}

function App() {
  const [freshUser, setFreshUser] = useState(true)
  const [endpoint, setEndpoint] = useState(null)

  // console.log(generateRandomHash())

  useEffect(() => {
    const path = window.location.pathname
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

  const handleCreateEndpoint = async () => {
    /* 
    1. request new endpoint from backend
    2. modify "endpoint" state value 
    3. 
    */

    const newEndpoint = await createEndpoint()

    setEndpoint(newEndpoint)

    const nextURL = `${window.location.href}${newEndpoint.endpoint_hash}/view`
    const nextTitle = 'our Request bin'

    console.log(nextTitle, nextURL)
    // This will create a new entry in the browser's history, without reloading
    window.history.pushState({}, nextTitle, nextURL)

    // setFreshUser(false)
  }

  return (
    <>
      {freshUser ? (
        <GenerateEndpoint
          handleCreateEndpoint={handleCreateEndpoint}
          setFreshUser={setFreshUser}
        />
      ) : (
        <EndpointView
          endpoint={endpoint}
          handleCreateEndpoint={handleCreateEndpoint}
        />
      )}
    </>
  )
}

export default App
