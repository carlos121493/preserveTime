chrome.devtools.panels.create(
    'Preserve',
    null, // No icon path
    'panel/preserve.html',
    null // no callback needed
);

debToolPage = chrome.runtime.connect({page: 'devtools-page'});
debToolPage.onMessage.addListener(function (message) {
  alert(message);
});
chrome.runtime.sendMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: "content_script.js",
});