console.log('hello');
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  console.log("Got message from background page: " + msg);
});
