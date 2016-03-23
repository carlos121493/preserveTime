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
        sendResponse({hehe:'finished'});
    };
    port.onMessage.addListener(extensionListener);
    port.onDisConnect.addListener(function (port) {
        port.onMessage.removeListener(extensionListener);
    });
});
