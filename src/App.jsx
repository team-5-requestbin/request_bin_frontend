/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'
import { createEndpoint, getFullRequest } from './services/db_queries'

/* 
- check local storage to see if there is any session information re: past endpoints
*/

const dummyRequests = [
  {
    id: 1,
    endpoint: 'a111111',
    dt_received: '2024-09-16 02:18:56.062676',
    mongo_id: 1,
    method: 'POST',
    path: '/sample/post/request/',
  },
  {
    id: 2,
    endpoint: 'a111111',
    dt_received: '2024-09-16 02:19:56.062676',
    mongo_id: 2,
    method: 'POST',
    path: '/',
  },
  {
    id: 3,
    endpoint: 'a111111',
    dt_received: '2024-09-16 02:20:56.062676',
    mongo_id: 3,
    method: 'GET',
    path: '/sample/get/request?id=ddc5f0ed-60ff-4435-abc5-590fafe4a771&timestamp=1544827965&event=delivered',
  },
]

// const dummyBins = [
//   {
//     id: 1,
//     endpoint: 'a111111',
//     dt_created: '2024-09-16 01:21:00.000000',
//   },
//   {
//     id: 2,
//     endpoint: 'b222222',
//     dt_created: '2024-09-16 01:21:00.000000',
//   },
//   {
//     id: 3,
//     endpoint: 'c333333',
//     dt_created: '2024-09-16 01:21:00.000000',
//   },
// ]

// const dummyRequestObjects = [
//   {
//     id: 1,
//     dt_created: '2024-09-16 02:18:56.062676',
//     endpoint: 'a111111',
//     request_object: {
//       method: 'POST',
//       path: '/sample/post/request/',
//       headers: {
//         host: 'enlt637fuyveg.x.pipedream.net',
//         'x-amzn-trace-id': 'Root=1-66e8a638-1ff856491e0f24cc2a0dd6f2',
//         'content-length': 88,
//         pragma: 'no-cache',
//         'cache-control': 'no-cache',
//         accept: 'application/json, text/plain, */*',
//         'user-agent':
//           'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
//         'content-type': 'application/json',
//         origin: 'https://public.requestbin.com',
//       },
//       body: {
//         id: 'ddc5f0ed-60ff-4435-abc5-590fafe4a771',
//         timestamp: 1544827965,
//         event: 'delivered',
//       },
//     },
//   },
//   {
//     id: 2,
//     dt_created: '2024-09-16 02:19:56.062676',
//     endpoint: 'a111111',
//     request_object: {
//       method: 'POST',
//       path: '/',
//       headers: {
//         host: 'enlt637fuyveg.x.pipedream.net',
//         'x-amzn-trace-id': 'Root=1-66e8a638-1ff856491e0f24cc2a0dd6f2',
//         'content-length': 88,
//         pragma: 'no-cache',
//         'cache-control': 'no-cache',
//         accept: 'application/json, text/plain, */*',
//         'user-agent':
//           'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
//         'content-type': 'application/json',
//         origin: 'https://public.requestbin.com',
//       },
//       body: {
//         id: 'ddc5f0ed-60ff-4435-abc5-590fafe4a771',
//         timestamp: 1544827965,
//         event: 'delivered',
//       },
//     },
//   },
//   {
//     id: 3,
//     dt_created: '2024-09-16 02:20:56.062676',
//     endpoint: 'a111111',
//     request_object: {
//       method: 'GET',
//       path: '/sample/get/request?id=ddc5f0ed-60ff-4435-abc5-590fafe4a771&timestamp=1544827965&event=delivered',
//       headers: {
//         host: 'enlt637fuyveg.x.pipedream.net',
//         'x-amzn-trace-id': 'Root=1-66e8a638-1ff856491e0f24cc2a0dd6f2',
//         'content-length': 88,
//         pragma: 'no-cache',
//         'cache-control': 'no-cache',
//         accept: 'application/json, text/plain, */*',
//         'user-agent':
//           'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
//         'content-type': 'application/json',
//         origin: 'https://public.requestbin.com',
//       },
//     },
//   },
// ]

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
  return <>{JSON.stringify(requestData)}</>
}

function App() {
  const [endpoint, setEndpoint] = useState(null)
  const [currentRequest, setCurrentRequest] = useState(null)
  const [requests, setRequests] = useState(dummyRequests) // conditional rendering with null or [], impact of useEffect and dom creation

  // how do we make async request?  probably not in USE EFFECT
  const handleCreateEndpoint = async () => {
    setEndpoint(await createEndpoint())
  }

  const handleFetchSingleRequest = (endpoint_id, request_id) => {
    return getFullRequest(endpoint_id, request_id)
  }

  const truncateText = (text, maxLength = 20) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">Endpoint: {endpoint}</h1>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleCreateEndpoint}
          >
            Create New Endpoint
          </button>
          <button
            id="copy-button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => alert(`copied: ${endpoint}`)}
          >
            Copy URL
          </button>
        </div>
      </header>

      <main className="flex">
        <div className="w-1/2 pr-2">
          <h5 className="font-bold mb-2">Current Requests</h5>
          <ul>
            {requests.map((request) => (
              <li
                key={request.id}
                className="mb-1 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  const req = handleFetchSingleRequest(endpoint, request.id)
                  setCurrentRequest(req)
                }}
              >
                {request.dt_received} | {request.method} |{' '}
                {truncateText(request.path)}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 pl-2">
          <h3 className="font-bold mb-2">Currently Viewed Request</h3>
          {currentRequest ? (
            <CurrentlyViewedRequest requestData={currentRequest} />
          ) : (
            <p>Select a request to view details</p>
          )}
        </div>
      </main>
    </div>
  )
  //   return (
  //     <>
  //       <div className="px-1 border-8">This is a request bin</div>
  //       <CreateEndpointButton handleCreateEndpoint={handleCreateEndpoint} />
  //       <button id="copy-button" onClick={() => alert(`copied: ${endpoint}`)}>
  //         Copy
  //       </button>
  //       <div>
  //         <span>Endpoint: {endpoint}</span>
  //       </div>

  //       <h5>Current Requests</h5>
  //       {requests.map((request) => {
  //         return (
  //           <li
  //             key={request.id}
  //             onClick={() => {
  //               const req = handleFetchSingleRequest(endpoint, request.id)
  //               setCurrentRequest(req)
  //             }}
  //           >
  //             {request.dt_received} | {request.method} | {request.path}
  //           </li>
  //         )
  //       })}
  //       <br />
  //       <br />
  //       <h3>
  //         <b>Currently Viewed Request</b>
  //       </h3>

  //       {currentRequest ? (
  //         <CurrentlyViewedRequest requestData={currentRequest} />
  //       ) : null}
  //     </>
  //   )
}

export default App

// id: 1,
// endpoint: 'a111111',
// dt_received: '2024-09-16 02:18:56.062676',
// mongo_id: 1,
// method: 'POST',
// path: '/sample/post/request/',
