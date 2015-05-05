var clientId, apiKey, scopes;
clientId = '917469036534-gd87e8jt3lihvs72402b0uhmbfr9s0ot.apps.googleusercontent.com';
apiKey = 'AIzaSyCj_zOSAGpPnUTcD6JOJX5nmTdOaVuBp2o'; //'7fcfa950a9791b5f30db1c1989661ea248081059';
scopes = 'https://www.googleapis.com/auth/analytics.readonly';
console.log('hel');

// This function is called after the Client Library has finished loading




/**
 * Callback executed once the Google APIs Javascript client library has loaded.
 * The function name is specified in the onload query parameter of URL to load
 * this library. After 1 millisecond, checkAuth is called.
 */
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  console.log('handleClientLoad: ' + gapi.client);
  //window.setTimeout(checkAuth, 1);
  window.setTimeout(gapi.client.load('analytics', 'v3', handleAuthorized), 5);
}


/**
 * Uses the OAuth2.0 clientId to query the Google Accounts service
 * to see if the user has authorized. Once complete, handleAuthResults is
 * called.
 */
function checkAuth() {
  gapi.auth.authorize({
    client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}


/**
 * Handler that is called once the script has checked to see if the user has
 * authorized access to their Google Analytics data. If the user has authorized
 * access, the analytics api library is loaded and the handleAuthorized
 * function is executed. If the user has not authorized access to their data,
 * the handleUnauthorized function is executed.
 * @param {Object} authResult The result object returned form the authorization
 *     service that determine whether the user has currently authorized access
 *     to their data. If it exists, the user has authorized access.
 */
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    console.log('handleAuthRes');
    gapi.client.load('analytics', 'v3', handleAuthorized);
  } else {
    handleUnauthorized();
  }
}


/**
 * Updates the UI once the user has authorized this script to access their
 * data. This changes the visibiilty on some buttons and adds the
 * makeApiCall click handler to the run-demo-button.
 */
function handleAuthorized() {
  var authorizeButton = document.getElementById('authorize-button');
  var runDemoButton = document.getElementById('run-demo-button');
  console.log('handleAuthorized');
  authorizeButton.style.visibility = 'hidden';
  runDemoButton.style.visibility = '';
  runDemoButton.onclick = makeApiCall;
  outputToPage('Click the Run Demo button to begin.');
}


/**
 * Updates the UI if a user has not yet authorized this script to access
 * their Google Analytics data. This function changes the visibility of
 * some elements on the screen. It also adds the handleAuthClick
 * click handler to the authorize-button.
 */
function handleUnauthorized() {
  var authorizeButton = document.getElementById('authorize-button');
  var runDemoButton = document.getElementById('run-demo-button');

  runDemoButton.style.visibility = 'hidden';
  authorizeButton.style.visibility = '';
  authorizeButton.onclick = handleAuthClick;
  outputToPage('Please authorize this script to access Google Analytics.');
}


/**
 * Handler for clicks on the authorization button. This uses the OAuth2.0
 * clientId to query the Google Accounts service to see if the user has
 * authorized. Once complete, handleAuthResults is called.
 * @param {Object} event The onclick event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize({
    client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}
