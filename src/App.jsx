/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react'

import './App.css'
import {
  createEndpoint,
  getSingle,
  getAll,
  endpointExists,
} from './services/api_queries'

import settings from './settings'

const BASE_URL = settings.BASE_URL

const DeleteAllButton = ({ handleDeleteAll, endpoint_hash }) => {
  return (
    <>
      <button
        className="font-bold py-3 px-20 rounded-full shadow-lg hover:bg-red-600 transition duration-400"
        onClick={() => {
          handleDeleteAll(endpoint_hash)
        }}
      >
        <i className={'fas fa-trash mr-3'}></i>
        Delete All
      </button>
    </>
  )
}

// const DeleteRequestButton = ({}) => {}
// TODO

const CreateEndpointButton = ({ handleCreateEndpoint }) => {
  return (
    <>
      <button
        className="font-bold py-3 px-20 rounded-full hover:bg-green-500 transition duration-400"
        onClick={async () => {
          console.log('created endpoint: ', await handleCreateEndpoint())
        }}
      >
        <i className="fas fa-plus mr-3"></i>new endpoint
      </button>
    </>
  )
}

const GenerateEndpoint = ({ handleCreateEndpoint, setFreshUser }) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-800 text-white">
      <button
        className="font-bold py-3 px-5 rounded-full shadow-lg bg-green-500 transition duration-400"
        onClick={async () => {
          const newEndpoint = await handleCreateEndpoint()
          console.log(`In GenerateEndPoint: newEndPoint: ${newEndpoint}`)
          setFreshUser(false)
        }}
      >
        Generate Endpoint
      </button>
    </main>
  )
}

const CopyButton = ({ endpoint_hash }) => {
  const [icon, setIcon] = useState('fas fa-link mr-3')
  const [text, setText] = useState('copy')
  return (
    <button
      className="font-bold py-3 px-20 rounded-full shadow-lg hover:bg-sky-400 transition duration-400"
      onClick={() => {
        navigator.clipboard.writeText(BASE_URL + endpoint_hash)
        setIcon('fas fa-check mr-3')
        setText('copied')
        setTimeout(() => {
          setIcon('fas fa-link mr-3')
          setText('copy')
        }, 3000)
      }}
    >
      <i className={icon}></i>
      {text}
    </button>
  )
}

const TargetEndpoint = ({ endpoint_hash }) => {
  return (
    <button
      className="font-mono text-3xl py-3 px-5 text-yellow-300" // border-4 border-sky-400 rounded-sm
      onClick={() => {
        console.log('tried to copy: ', BASE_URL + endpoint_hash)
      }}
    >
      {BASE_URL + endpoint_hash}
    </button>
  )
}

const CurrentlyViewedRequest = ({ requestData }) => {
  //   console.log('->', requestData)
  return (
    <>
      {JSON.stringify(requestData, undefined, 4)}
      <div>Details</div>
      <div>Headers</div>
      <div>Body</div>
    </>
  )
}

const NoCurrentlyViewed = ({ endpoint_hash }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center">
        <div>Your endpoint hash: {endpoint_hash}</div>

        <button
          onClick={() => {
            // TODO
            alert('test events were generated!')
          }}
        >
          Generate Test Events
        </button>
        <div>more info...</div>
      </div>
    </div>
  )
}

const RequestTable = ({
  requests,
  endpoint_hash,
  handleFetchSingleRequest,
}) => {
  const verbColor = {
    GET: 'text-green-500',
    POST: 'text-sky-500',
    PUT: 'text-orange-500',
    DELETE: 'text-red-500',
  }

  return (
    <>
      <div
        id="table-headings"
        className="flex flex-auto py-5 pl-3 bg-slate-600 border"
      >
        <span className="flex-1 font-bold text-xl">
          <i className="fas fa-clock mr-3"></i>Time
        </span>
        <span className="flex-1 font-bold text-xl">Verb</span>
        <span className="flex-1 font-bold text-xl">Path</span>
      </div>
      <div
        id="table-content"
        className="flex flex-col max-h-[600px] overflow-y-auto scrollbar-hidden"
      >
        {requests.map((request, i) => (
          <Request
            evenRow={i % 2 === 0}
            verbColor={verbColor}
            request={request}
            key={request.id}
            endpoint_hash={endpoint_hash}
            handleFetchSingleRequest={handleFetchSingleRequest}
          />
        ))}
      </div>
    </>
  )
}

const Request = ({
  request,
  handleFetchSingleRequest,
  endpoint_hash,
  evenRow,
  verbColor,
}) => {
  const { method, path, dt_received } = request
  const abbrPath = path.length < 30 ? path : path.slice(0, 30)

  const [date, time] = new Date(dt_received).toLocaleString().split(',')

  return (
    <div
      className={`flex flex-auto py-5 pl-3 cursor-pointer`}
      key={request.id}
      onClick={() => {
        console.log(request.path)
        handleFetchSingleRequest(endpoint_hash, request.id)
      }}
    >
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {time}
      </span>
      <span
        className={`flex-1 font-bold ${
          verbColor[method] ?? 'text-white'
        } overflow-hidden text-ellipsis whitespace-nowrap`}
      >
        {method}
      </span>
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {abbrPath}
      </span>
    </div>
  )
}

const EndpointView = ({ endpoint_hash, handleCreateEndpoint }) => {
  const [currentRequest, setCurrentRequest] = useState(null)
  const [requests, setRequests] = useState([])

  const handleFetchSingleRequest = async (endpoint_hash, request_id) => {
    const singleRequest = await getSingle(endpoint_hash, request_id)
    console.log('setting current request to:', singleRequest)
    setCurrentRequest(singleRequest)
    setCurrentRequest(singleRequest)
  }

  const deleteAll = async (endpoint_hash) => {
    // TODO
    console.log('deleting all requests for endpoint: ', endpoint_hash)
  }

  useEffect(() => {
    const fetchEndpointRequests = async (endpoint_hash) => {
      const data = await getAll(endpoint_hash)
      setRequests(data)
    }
    fetchEndpointRequests(endpoint_hash)
  }, [])

  return (
    <>
      <div className="min-h-screen flex-col items-center bg-neutral-800 text-white">
        <nav className="h-1/8 flex flex-row py-5 px-5 align-baseline">
          <div className="flex-1">
            <TargetEndpoint endpoint_hash={endpoint_hash} />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <CopyButton endpoint_hash={endpoint_hash} />
            <CreateEndpointButton handleCreateEndpoint={handleCreateEndpoint} />
          </div>
        </nav>
        <main className="h-7/8 flex flex-row py-5 px-5 align-baseline">
          <div className="flex-1 m-10">
            <RequestTable
              requests={requests}
              endpoint_hash={endpoint_hash}
              handleFetchSingleRequest={handleFetchSingleRequest}
            />
            <DeleteAllButton
              handleDeleteAll={deleteAll}
              endpoint_hash={endpoint_hash}
            />
          </div>

          <div className="flex-1">
            {currentRequest ? (
              <CurrentlyViewedRequest requestData={currentRequest} />
            ) : (
              <NoCurrentlyViewed endpoint_hash={endpoint_hash} />
            )}
          </div>
        </main>
      </div>
    </>
  )
}

function App() {
  const [freshUser, setFreshUser] = useState(true)
  const [endpoint_hash, setEndpointHash] = useState(null)

  useEffect(() => {
    const path = window.location.pathname
    if (path === '/') return

    const regex = /^\/[a-z0-9]{8}\/view$/i

    if (!regex.test(path)) return

    const checkIfEndpointExists = async (candidate_endpoint) => {
      const exists = await endpointExists(candidate_endpoint)
      if (exists) {
        // navigates to an existing endpoint's view
        setFreshUser(false)
        setEndpointHash(candidate_endpoint)
      }
    }

    const potentialEndpoint = path.slice(1, 9)

    checkIfEndpointExists(potentialEndpoint)
  }, [])

  const handleCreateEndpoint = async () => {
    const newEndpoint = await createEndpoint()

    const nextURL = `${BASE_URL}${newEndpoint}/view`
    const nextTitle = 'our Request bin'

    window.history.pushState({}, nextTitle, nextURL)

    setEndpointHash(newEndpoint)
    return newEndpoint
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
          endpoint_hash={endpoint_hash}
          handleCreateEndpoint={handleCreateEndpoint}
        />
      )}
    </>
  )
}

export default App
