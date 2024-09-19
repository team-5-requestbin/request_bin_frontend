Wednesday/Thursday todos:

# FUNCTIONALITY:

- generate test requests which query our target endpoint
- checking local storage, populating local storage (persistent sessions, we are storing previously used endpoints)
- make our "copy to clipboard"
- update current url when we click "create new endpoint" (History API)

# UI:

- general layout and styling
- breaking down the "currently viewed request" data

// useEffect(() => {
// check url for a bin id

/\* - input the base url of our request bin https://www.requestbin.com - input a url with a endpoint in the path https://www.requestbin.com/&@$@$&&/view

      - DOES THIS endpoint view exist for another user?  if it does exist for another client, add

      - check curr local storage for existing bins (endpoints)
          - if the key exists, load the last view of the most recent endpoint (last in the array)
          - otherwise -> , call createEndpoint, add to local storage, redirect to new url for VIEW of that endpoint
      */

// const checkLocalStorage = () => {
// const cachedEndpoints = localStorage.getItem('cached_endpoints')

// if (!cachedEndpoints) {
// // check db
// }
// }

// return () => {}
// }, [])

// const createNewBin = async (event) => {
// event.preventDefault()

// try {
// const endpoint = createBin()

// const endpointsArray = localStorage.getItem('bin5alive.endpoints')

// endpointsArray.push(endpoint)

// window.localStorage.setItem(
// 'bin5alive.endpoints',
// JSON.stringify(endpointsArray)
// )

// window.localStorage.setItem('bin5alive.current', JSON.stringify(endpoint))
// } catch (error) {
// setErrorMessage('Error: Could not create a new bin')
// setTimeout(() => {
// setErrorMessage(null)
// }, 3000)
// }
// }
