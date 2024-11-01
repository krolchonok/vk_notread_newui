let toggleState = false;

browser.storage.local.get("toggleState").then((result) => {
  if (result.toggleState !== undefined) {
    toggleState = result.toggleState;
  }
});

browser.runtime.onMessage.addListener((message) => {
  if (message.toggleState !== undefined) {
    toggleState = message.toggleState;
  }
});

browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.requestBody) {
      const body = details.requestBody.formData.code[0];
      if (body.includes("API.messages.markAsRead") && toggleState) {
        return { cancel: true };
      }
    }

    return { cancel: false };
  },
  {
    urls: ["https://api.vk.com/method/execute*"],
  },
  ["blocking", "requestBody"]
);
