var tab_log = function(json_args) {
    console.log.apply(console, escape(json_args));
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    alert(msg)
    chrome.tabs.executeScript({
        code: "("+ tab_log + ")('" + msg + "');",
    });
});

chrome.tabs.executeScript(null, {file: "content_script.js"});