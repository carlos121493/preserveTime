var tab_log = function(json_args) {
    console.log.apply(console, escape(json_args));
};

chrome.runtime.onMessage.addListener(function(msg) {
    alert(msg)
    chrome.tabs.executeScript({
        code: "("+ tab_log + ")('" + msg + "');",
    });
});
