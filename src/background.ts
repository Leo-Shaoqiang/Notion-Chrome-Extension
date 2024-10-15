chrome.runtime.onInstalled.addListener(() => {
  console.log('Notion Chrome Extension installed');
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getToken') {
    chrome.storage.local.get(['notionToken'], (result) => {
      sendResponse({ token: result.notionToken });
    });
    return true; // Indicates that the response is asynchronous
  }
});