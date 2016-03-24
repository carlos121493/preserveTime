// var tab_log = function(json_args) {
//     console.log.apply(console, escape(json_args));
// };
//
// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//     chrome.tabs.executeScript({
//         code: "("+ tab_log + ")('" + msg + "');",
//     });
// });

// chrome.tabs.executeScript(null, {file: "content_script.js"});

chrome.runtime.onConnect.addListener(function (port) {
    var extensionListener = function(message, sender, sendResponse) {
        chrome.tabs.executeScript(message.tabId, { file: message.scriptToInject });
    };
    port.onMessage.addListener(extensionListener);
    port.onDisConnect.addListener(function (port) {
      port.onMessage.removeListener(extensionListener);
    });
});
function sendMessage(message) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        lastTabId = tabs[0].id;
        chrome.tabs.sendMessage(lastTabId, message);
    });
}
chrome.webRequest.onCompleted.addListener(function (item) {
    sendMessage(JSON.stringify(item));
}, {
  urls: [
    "http://*/*"
  ], types:["xmlhttprequest"]
});

chrome.webRequest.onErrorOccurred.addListener(function (item) {
    sendMessage(JSON.stringify(item));
}, {
    urls: [
      "*://*/*"
    ], types:["xmlhttprequest"]
});

// chrome.webRequest.onResponseStarted.addListener(function(item) {
//     alert(JSON.stringify(item));
// });
